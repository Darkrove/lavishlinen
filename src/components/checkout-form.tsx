import React, { useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Token,
  ShippingData,
  OrderData,
  Response,
  IncomingOrder,
} from "@/types/checkout";
import { Button } from "@/ui/button";
import { Icons } from "@/components/icons";
import client from "@/lib/commerce";
import { useCartDispatch, useCartState } from "@/store/cart";
import clsx from "clsx";
import Link from "next/link";
import Paragraph from "./ui/paragraph";
import { Separator } from "./ui/seperator";
import Badge from "./ui/badge";

interface Props {
  token: Token | null;
  tokenId: string;
  shippingData: ShippingData;
  handleBack: () => void;
}

const CheckoutForm = ({ token, tokenId, shippingData, handleBack }: Props) => {
  const [paymentType, setPaymentType] = useState("");
  const [payment, setPayment] = useState({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<IncomingOrder>();
  const stripe = useStripe();
  const { setCart } = useCartDispatch();
  const elements = useElements();

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <p>Processing...</p>;

      case "requires_action":
        return <p>Authenticating...</p>;

      case "success":
        return <p>Payment Succeeded 🥳</p>;

      case "error":
        return (
          <>
            <p>Error 😭</p>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const handleRefreshCart = async () => {
    const newCart = await client.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (
    checkoutTokenId: string,
    orderData: OrderData,
    data: OrderData
  ) => {
    try {
      const incomingOrder = await client.checkout.capture(
        checkoutTokenId,
        orderData
      );
      console.log(incomingOrder);
      setOrder(incomingOrder);
      setPayment({ status: "success" });
      handleRefreshCart();
    } catch (response) {
      console.warn(response);
      if (
        (response as Response).statusCode !== 402 ||
        (response as Response).data.error.type !== "requires_verification"
      ) {
        // Handle the error as usual because it's not related to 3D secure payments
        setPayment({ status: "error" });
        setErrorMessage((response as Response).message);
        console.warn(response);
        return;
      }
      if (!stripe) {
        return;
      }
      const cardActionResult = await stripe.handleCardAction(
        (response as Response).data.error.param
      );

      if (cardActionResult.error) {
        // The customer failed to authenticate themselves with their bank and the transaction has been declined
        alert(cardActionResult.error.message);
        return;
      }
      try {
        const order = await client.checkout.capture(checkoutTokenId, {
          ...data,
          payment: {
            gateway: "stripe",
            stripe: {
              payment_intent_id: cardActionResult.paymentIntent.id,
            },
          },
        });

        // If we get here the order has been captured successfully and the order detail is available in the order variable
        console.log(order);
        setOrder(order);
        setPayment({ status: "success" });
        handleRefreshCart();

        return;
      } catch (response) {
        // Just like above, we get here if the order failed to capture with Commrece.js
        console.warn(response);
        alert((response as Response).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    if (!stripe || !elements) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }
    setPayment({ status: "processing" });
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPayment({ status: "error" });
      setErrorMessage(error.message ?? "An unknown error occurred");
    } else {
      setErrorMessage("");
      const data = {
        line_items: token!.line_items,
        customer: {
          firstname: shippingData.Firstname,
          lastname: shippingData.Lastname,
          email: shippingData.Email,
        },
        shipping: {
          name: shippingData.Firstname + " " + shippingData.Lastname,
          street: shippingData.Address,
          town_city: shippingData.City,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.Pin,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        billing: {
          name: shippingData.Firstname + " " + shippingData.Lastname,
          street: shippingData.Address,
          town_city: shippingData.City,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.Pin,
          country: shippingData.shippingCountry,
        },
      };
      const orderData = {
        ...data,
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod?.id,
          },
        },
      };
      handleCaptureCheckout(tokenId, orderData, data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <CardElement />
        <div className="flex justify-between">
          {/* onClick={() => setState("account")} */}
          <Button variant="outline" onClick={handleBack}>
            <Icons.arrowLeft className="w-4 h-4 mr-2" /> <span>Back</span>
          </Button>

          <Button
            isLoading={isLoading}
            type="submit"
            disabled={
              !["initial", "succeeded", "error"].includes(payment.status) ||
              !stripe ||
              !elements
            }
            className={clsx({
              "bg-green-600": payment.status === "success",
              "bg-red-600": payment.status === "error",
            })}
          >
            <span>
              Pay{" "}
              {tokenId && token && token?.total
                ? token?.total?.formatted_with_symbol
                : ""}
            </span>
          </Button>
        </div>
        {payment.status !== "initial" && (
          <div className="bg-yellow-500 rounded-lg p-4 text-white flex flex-col justify-center items-center">
            <PaymentStatus status={payment.status} />
          </div>
        )}

        {payment.status === "success" && order && order?.id && (
          <div className="bg-slate-200 text-slate-800 p-4 rounded-lg">
            <div className="bg-green-500 rounded-lg p-4 text-white flex flex-col justify-center items-center">
              <Paragraph>
                Your order has been placed successfully. Your order id is{" "}
                <span className="font-bold">{order?.id}</span>
              </Paragraph>
            </div>
            <Paragraph>Order Summary</Paragraph>
            <div>
              {order?.line_items?.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <Paragraph>
                    {item.product_name}
                    <span className="text-green-500">x {item.quantity}</span>
                  </Paragraph>
                  <Paragraph className="text-green-500">
                    {item.line_total.formatted_with_symbol}
                  </Paragraph>
                </div>
              ))}

              <Separator className="my-2 bg-slate-800" />
              <div className="flex justify-between">
                <Paragraph>Subtotal</Paragraph>
                <Paragraph>{order?.subtotal?.formatted_with_symbol}</Paragraph>
              </div>
              <div className="flex justify-between">
                <Paragraph>Shipping</Paragraph>
                <Paragraph>
                  {order?.shipping?.price?.formatted_with_symbol}
                </Paragraph>
              </div>
            </div>
            <Separator className="my-2 bg-slate-800" />
            <div className="flex justify-between items-center">
              <Paragraph>Total</Paragraph>
              <div className="flex justify-between items-center">
                <Paragraph>{order?.total?.formatted_with_symbol}</Paragraph>
                <Badge
                  variant="outline"
                  size="sm"
                  className="text-green-500 ml-2 mb-2"
                >
                  INR
                </Badge>
              </div>
            </div>
          </div>
        )}

        {payment.status === "success" && (
          <Link href="/categories/all">
            <Button className="w-full bg-violet-500 mg">
              <span>Continue Shopping</span>
              <Icons.shoppingCart className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
        {payment.status === "error" && (
          <Button className="bg-green-500 w-full">
            <a
              className="flex space-x-2 justify-center items-center w-full"
              href="https://wa.me/9850698000?text=I%20have%20a%20query%20regarding%20your%20product."
              target="_blank"
              rel="noreferrer"
            >
              <Icons.whatsapp className="w-4 h-4" />
              <span>
                Contact us on Whatsapp for any queries regarding your order
              </span>
            </a>
          </Button>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
