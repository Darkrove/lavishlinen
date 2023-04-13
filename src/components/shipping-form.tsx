"use client";
import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import client from "@/lib/commerce";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icons } from "@/components/icons";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  checkoutTokenId: string;
}

const ShippingForm = ({ checkoutTokenId }: Props) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("IND");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const [state, setState] = useState("account");
  const [shippingInfoSaved, setShippingInfoSaved] = useState(false);

  const handleSaveShippingInfo = () => {
    setShippingInfoSaved(true);
    setState("payment");
  };

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

  useEffect(() => {
    fetchShippingCountries(checkoutTokenId);
  }, [checkoutTokenId]);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutTokenId,
        shippingCountry,
        shippingSubdivision
      );
  }, [checkoutTokenId, shippingCountry, shippingSubdivision]);

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
          Enter your details. Click save when you&apos;re done.
        </p>
        <div className="grid md:grid-cols-2 gap-2 py-4">
          <div className="space-y-1">
            <Label htmlFor="firstname">First Name *</Label>
            <Input id="firstname" placeholder="Enter your first name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastname">Last Name *</Label>
            <Input id="lastname" placeholder="Enter your last name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Address *</Label>
            <Input id="address" placeholder="Enter your address" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="city">City *</Label>
            <Input id="city" placeholder="Enter your city" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pin">Pin code *</Label>
            <Input id="pin" placeholder="Enter your pin code" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="country">Country *</Label>
            <Select value={shippingCountry} onValueChange={setShippingCountry}>
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
          <Link href="/cart">
            <Button variant="outline">
              <Icons.arrowLeft className="w-4 h-4 mr-2" />{" "}
              <span>Back to cart</span>
            </Button>
          </Link>

          <Button onClick={handleSaveShippingInfo}>
            <span>Next</span>
            <Icons.arrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="payment">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your payment information below.
        </p>
        <div className="grid gap-2 py-4">
          <div className="space-y-1">
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
          </div>
        </div>

        <div className="flex justify-between">
          <Button onClick={() => setState("account")} variant="outline">
            <Icons.arrowLeft className="w-4 h-4 mr-2" /> <span>Back</span>
          </Button>

          <Button>
            <span>Checkout</span>
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ShippingForm;
