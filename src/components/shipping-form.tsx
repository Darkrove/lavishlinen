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
import CheckoutForm from "@/components/checkout-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm, SubmitHandler } from "react-hook-form";
import { Token, OrderData, ShippingData } from "@/types/checkout";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [state, setState] = useState("account");
  const [shippingInfoSaved, setShippingInfoSaved] = useState(false);
  const [shippingData, setShippingData] = useState<ShippingData>({} as any);
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

  type Array = {
    id: string;
    label: string;
  };

  function getStateLabel(states: Array[], idToFind: string): string {
    const state = states.find((s) => s.id === idToFind);
    return state ? state.label : "";
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { Firstname, Lastname, Email, Address, City, Pin } = data;

    if (
      !Firstname ||
      !Lastname ||
      !Email ||
      !Address ||
      !City ||
      !Pin ||
      !shippingCountry ||
      !shippingSubdivision ||
      !shippingOption
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setShippingData({
      ...data,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    });

    toast({
      title: "Shipping Info Saved",
      description: "Your shipping info has been saved.",
      variant: "success",
    });

    handleNext();
  };
  console.log(shippingData);

  const handleSaveShippingInfo = () => {
    setShippingInfoSaved(true);
    setState("payment");
  };

  const handleNext = () => {
    setState("payment");
  };

  const handleBack = () => {
    setState("account");
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
          Enter your details. Click next when you&apos;re done.
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
                    {shippingCountry
                      ? getStateLabel(countries, shippingCountry)
                      : "Select a country"}
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
                    {shippingSubdivision
                      ? getStateLabel(subdivisions, shippingSubdivision)
                      : "Select a state"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[400px]">
                    {subdivisions.map((subdivision) => (
                      <SelectItem key={subdivision.id} value={subdivision.id}>
                        {subdivision.label}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="state">Shipping option *</Label>
              <Select value={shippingOption} onValueChange={setShippingOption}>
                <SelectTrigger>
                  <SelectValue aria-label={shippingOption}>
                    {shippingOption
                      ? getStateLabel(options, shippingOption)
                      : "Select a shipping option"}
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
            <Link href="/cart">
              <Button variant="outline">
                <Icons.arrowLeft className="w-4 h-4 mr-2" />{" "}
                <span>Back to cart</span>
              </Button>
            </Link>
            {/* <Button variant="outline">
              <input type="submit" />
            </Button> */}

            <Button type="submit">
              <span>Next</span>
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </TabsContent>
      <TabsContent value="payment">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your card information below.
        </p>
        <div className="grid gap-2 py-4">
          <div className="space-y-1">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                token={token}
                tokenId={tokenId}
                shippingData={shippingData}
                handleBack={handleBack}
              />
            </Elements>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ShippingForm;
