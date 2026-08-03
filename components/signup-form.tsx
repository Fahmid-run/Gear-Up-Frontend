"use client";

import type React from "react";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpAction } from "@/app/(auth)/_actions/authAction";
import { toast } from "./ui/toast";

type Role = "customer" | "provider";

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: Role;
}

export function SignupForm() {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "customer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [state, action, pending] = useActionState(SignUpAction, false);
  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.success) {
      toast.add({
        type: "success",
        description: "Register Succeed",
      });
    }

    if (!state.success) {
      toast.add({
        type: "error",
        description: state.message || "Register Failed",
      });
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-balance">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your details below to get started.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-500">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {state?.errors?.password && (
              <p className="text-sm text-red-500">{state.errors.password[0]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
            />
            {state?.errors?.phone && (
              <p className="text-sm text-red-500">{state.errors.phone[0]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="123 Main St, City, Country"
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
              required
            />

            {state?.errors?.address && (
              <p className="text-sm text-red-500">{state.errors.address[0]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Role</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value: Role) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
              name="role"
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="role-customer"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-input p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
              >
                <RadioGroupItem value="Customer" id="role-customer" />
                <span className="font-normal">Customer</span>
              </Label>
              <Label
                htmlFor="role-provider"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-input p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
              >
                <RadioGroupItem value="Provider" id="role-provider" />
                <span className="font-normal">Provider</span>
              </Label>
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter className="mt-6 flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {"Already have an account? "}
            <Link
              href="/login"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
