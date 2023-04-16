import React, { useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Token, ShippingData, OrderData, Response } from "@/types/checkout";
import { Button } from "@/ui/button";
import { Icons } from "@/components/icons";
import client from "@/lib/commerce";
import { useCartDispatch, useCartState } from "@/store/cart";
import clsx from "clsx";

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

      case "succeeded":
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
        handleRefreshCart();
        setPayment({ status: "success" });
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
      <form onSubmit={handleSubmit}>
        <CardElement />
        <div className="mt-4 flex justify-between">
          {/* onClick={() => setState("account")} */}
          <Button variant="outline" onClick={handleBack}>
            <Icons.arrowLeft className="w-4 h-4 mr-2" /> <span>Back</span>
          </Button>

          <Button
            isLoading={isLoading}
            type="submit"
            disabled={!stripe || !elements}
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
        <PaymentStatus status={payment.status} />
      </form>
    </>
  );
};

export default CheckoutForm;
