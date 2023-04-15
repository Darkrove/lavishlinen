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
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <LargeHeading>Checkout</LargeHeading>
        <Paragraph className="uppercase">{state.id}</Paragraph>
      </div>
      <ShippingForm stateId={state.id} />
    </div>
  );
}

export default CheckoutPage;
