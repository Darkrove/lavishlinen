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
import { useForm, SubmitHandler } from "react-hook-form";
import ShippingForm from "@/components/shipping-form";

interface Props {}

interface FormValues {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  city: string;
  pin: string;
}

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
      <ShippingForm checkoutTokenId={tokenId} />
    </div>
  );
}

export default CheckoutPage;
