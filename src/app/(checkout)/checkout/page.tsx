"use client";
import React, { useEffect, useState } from "react";
import { useCartDispatch, useCartState } from "@/store/cart";
import LargeHeading from "@/components/ui/large-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import client from "@/lib/commerce";
import Paragraph from "@/components/ui/paragraph";

interface Props {}

function CheckoutPage() {
  const state = useCartState();
  const [tokenId, setTokenId] = useState("");
  const [token, setToken] = useState({});
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await client.checkout.generateToken(state.id, {
          type: "cart",
        });

        setToken(token);
        setTokenId(token.id);
        console.log(token);
      } catch (error) {
        console.log(error);
      }
    };

    generateToken();
  }, [state.id]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <LargeHeading>Checkout</LargeHeading>
        <Paragraph className="uppercase">{tokenId}</Paragraph>
      </div>
      <Tabs defaultValue="account" className="max-w-2xl w-full">
        <TabsList>
          <TabsTrigger value="account">Shipping Details</TabsTrigger>
          <TabsTrigger value="payment">Payment Details</TabsTrigger>
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
          </div>
          <div className="flex">
            <Button>Save shipping information</Button>
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
          <div className="flex">
            <Button>Save payment information</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CheckoutPage;
