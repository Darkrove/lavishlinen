"use client";
import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import client from "@/lib/commerce";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { useCartDispatch, useCartState } from "@/store/cart";
import { useToast } from "@/hooks/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { useForm, SubmitHandler } from "react-hook-form";
import { Token, OrderData } from "@/types/checkout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY!
);

interface Props {
  stateId: string;
}

type FormData = {
  Firstname: string;
  Lastname: string;
  Address: string;
  City: string;
  Pin: string;
  Email: string;
};

type Response = {
  statusCode: number;
  data: {
    error: {
      type: string;
      param: string;
    };
  };
  message: string;
};

const ShippingForm = ({ stateId }: Props) => {
  // States
  const [token, setToken] = useState<Token | null>(null);
  const [tokenId, setTokenId] = useState("");
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("IND");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [state, setState] = useState("account");
  const [shippingInfoSaved, setShippingInfoSaved] = useState(false);
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const { setCart } = useCartDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Mapper
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  type optionType = {
    id: string;
    description: string;
    price: {
      formatted_with_symbol: string;
    };
  };

  const options = shippingOptions.map((so: optionType) => ({
    id: so.id,
    label: `${so.description} - (${so.price.formatted_with_symbol})`,
  }));

  // Functions
  const generateToken = async (stateId: string) => {
    try {
      const token = await client.checkout.generateToken(stateId, {
        type: "cart",
      });

      setToken(token);
      setTokenId(token.id);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries } = await client.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await client.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId: string,
    country: string,
    region: string | null
  ) => {
    const options = await client.checkout.getShippingOptions(checkoutTokenId, {
      country,
      region,
    });
    setShippingOptions(options);
    console.warn(options);
    setShippingOption(options[0].id);
  };

  const handleRefreshCart = async () => {
    const newCart = await client.cart.refresh();
    console.log(newCart);
    setCart(newCart);
  };

  const handleCaptureCheckout = async (
    checkoutTokenId: string,
    orderData: OrderData,
    stripe: Stripe,
    data: OrderData
  ) => {
    try {
      console.log(orderData);
      setIsLoading(true);
      const incomingOrder = await client.checkout.capture(
        checkoutTokenId,
        orderData
      );
      console.log(incomingOrder);
      setOrder(incomingOrder);
      handleRefreshCart();
    } catch (response) {
      console.log(response);
      if (
        (response as Response).statusCode !== 402 ||
        (response as Response).data.error.type !== "requires_verification"
      ) {
        // Handle the error as usual because it's not related to 3D secure payments
        console.log(response);
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
        handleRefreshCart();
        return;
      } catch (response) {
        // Just like above, we get here if the order failed to capture with Commrece.js
        console.log(response);
        alert((response as Response).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  type Array = {
    id: string;
    label: string;
  };

  function getStateLabel(states: Array[], idToFind: string): string {
    const state = states.find((s) => s.id === idToFind);
    return state ? state.label : "";
  }

  const onSubmit: SubmitHandler<FormData> = (data) =>
    setShippingData({
      ...data,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    });
  console.log(shippingData);

  const handlePayment = async (
    e: React.FormEvent<HTMLFormElement>,
    elements: typeof Elements,
    stripe: Stripe
  ) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElment = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElment,
    });
    const cardToken = await stripe.createToken(cardElment);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    } else {
      const data = {
        line_items: token?.line_items,
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
      handleCaptureCheckout(tokenId, orderData, stripe, data);
    }
  };

  const handleSaveShippingInfo = () => {
    setShippingInfoSaved(true);
    setState("payment");
  };

  // UseEffects
  useEffect(() => {
    generateToken(stateId);
  }, [stateId]);

  useEffect(() => {
    if (tokenId) {
      fetchShippingCountries(tokenId);
    }
  }, [tokenId]);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(tokenId, shippingCountry, shippingSubdivision);
  }, [tokenId, shippingCountry, shippingSubdivision]);

  return (
    <Tabs defaultValue="account" value={state} className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="account">Shipping Details</TabsTrigger>
        <TabsTrigger value="payment" disabled={!shippingInfoSaved}>
          Payment Details
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your details. Click submit when you&apos;re done.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-2 py-4">
            <div className="space-y-1">
              <div className="flex justify-between py-1">
                <Label htmlFor="firstname">First Name *</Label>
                <Label htmlFor="firstname" className="text-red-600">
                  {errors.Firstname?.type === "required" &&
                    "First name is required"}
                  {errors.Firstname?.type === "maxLength" &&
                    "First name cannot exceed 80 characters"}
                </Label>
              </div>
              <Input
                id="firstname"
                placeholder="Enter your first name"
                {...register("Firstname", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between py-1">
                <Label htmlFor="lastname">Last Name *</Label>
                <Label htmlFor="lastname" className="text-red-600">
                  {errors.Lastname?.type === "required" &&
                    "Last name is required"}
                  {errors.Lastname?.type === "maxLength" &&
                    "Last name cannot exceed 100 characters"}
                </Label>
              </div>
              <Input
                id="lastname"
                placeholder="Enter your last name"
                {...register("Lastname", { required: true, maxLength: 100 })}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between py-1">
                <Label htmlFor="address">Address *</Label>
                <Label htmlFor="address" className="text-red-600">
                  {errors.Address?.type === "required" && "Address is required"}
                  {errors.Address?.type === "maxLength" &&
                    "Address cannot exceed 300 characters"}
                </Label>
              </div>
              <Input
                id="address"
                placeholder="Enter your address"
                {...register("Address", { required: true, maxLength: 300 })}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between py-1">
                <Label htmlFor="email">Email *</Label>
                <Label htmlFor="email" className="text-red-600">
                  {errors.Email?.type === "required" && "Email is required"}
                  {errors.Email?.type === "pattern" &&
                    "Please enter a valid email address"}
                </Label>
              </div>
              <Input
                id="email"
                placeholder="Enter your email"
                {...register("Email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between py-1">
                <Label htmlFor="city">City *</Label>
                <Label htmlFor="city" className="text-red-600">
                  {errors.City?.type === "required" && "City is required"}
                  {errors.City?.type === "maxLength" &&
                    "City cannot exceed 200 characters"}
                </Label>
              </div>
              <Input
                id="city"
                placeholder="Enter your city"
                {...register("City", { required: true, maxLength: 200 })}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between py-1">
                <Label htmlFor="pin">Pin code *</Label>
                <Label htmlFor="pin" className="text-red-600">
                  {errors.Pin?.type === "required" && "Pin code is required"}
                  {errors.Pin?.type === "pattern" &&
                    "Please enter a valid pin code"}
                </Label>
              </div>
              <Input
                id="pin"
                placeholder="Enter your pin code"
                {...register("Pin", {
                  required: true,
                  pattern: /^[1-9][0-9]{2}\s{0,1}[0-9]{3}$/,
                })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="country">Country *</Label>
              <Select
                value={shippingCountry}
                onValueChange={setShippingCountry}
              >
                <SelectTrigger>
                  <SelectValue aria-label={shippingCountry}>
                    {getStateLabel(countries, shippingCountry)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="state">State *</Label>
              <Select
                value={shippingSubdivision}
                onValueChange={setShippingSubdivision}
              >
                <SelectTrigger>
                  <SelectValue aria-label={shippingSubdivision}>
                    {getStateLabel(subdivisions, shippingSubdivision)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {subdivisions.map((subdivision) => (
                    <SelectItem key={subdivision.id} value={subdivision.id}>
                      {subdivision.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="state">Shipping option *</Label>
              <Select value={shippingOption} onValueChange={setShippingOption}>
                <SelectTrigger>
                  <SelectValue aria-label={shippingOption}>
                    {getStateLabel(options, shippingOption)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between">
            {/* <Link href="/cart">
              <Button variant="outline">
                <Icons.arrowLeft className="w-4 h-4 mr-2" />{" "}
                <span>Back to cart</span>
              </Button>
            </Link> */}
            <Button variant="outline">
              <input type="submit" />
            </Button>

            <Button onClick={handleSaveShippingInfo}>
              <span>Next</span>
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </TabsContent>
      <TabsContent value="payment">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your payment information below.
        </p>
        <div className="grid gap-2 py-4">
          {/* <div className="space-y-1">
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="expirationDate">Expiration Date *</Label>
            <Input id="expirationDate" placeholder="MM/YY" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cvv">CVV *</Label>
            <Input id="cvv" type="password" placeholder="XXX" />
          </div> */}
          <div className="space-y-1">
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ elements, stripe }) => (
                  <form
                    onSubmit={(e) =>
                      handlePayment(
                        e,
                        elements as StripeElements,
                        stripe as Stripe
                      )
                    }
                  >
                    <CardElement />
                    <div className="mt-4 flex justify-between">
                      <Button
                        onClick={() => setState("account")}
                        variant="outline"
                      >
                        <Icons.arrowLeft className="w-4 h-4 mr-2" />{" "}
                        <span>Back</span>
                      </Button>

                      <Button
                        isLoading={isLoading}
                        type="submit"
                        disabled={!stripe}
                      >
                        <span>
                          Pay{" "}
                          {tokenId && token && token?.total
                            ? token?.total?.formatted_with_symbol
                            : ""}
                        </span>
                      </Button>
                    </div>
                  </form>
                )}
              </ElementsConsumer>
            </Elements>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ShippingForm;
