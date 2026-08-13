"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export function PaymentSuccessPage({ payload }: { payload: any }) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: payload.currency,
  }).format(payload.amount);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/5 p-4">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg animate-pulse" />
              <CheckCircle className="w-20 h-20 text-green-500 relative" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-center text-foreground mb-2">
            Payment Successful!
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Details Section */}
          <div className="space-y-4 mb-8  rounded-lg p-6">
            {/* Order ID */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <span className="font-mono font-light text-foreground">
                {payload.rentalOrderId}
              </span>
            </div>

            {/* Payment ID */}
            <div className="flex justify-between items-center border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Payment ID</span>
              <span className="font-mono font-light text-foreground text-sm">
                {payload.id}
              </span>
            </div>

            {/* Amount Paid */}
            <div className="flex justify-between items-center border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Amount Paid</span>
              <span className="text-xl font-bold text-green-600">
                {formattedAmount}
              </span>
            </div>

            {/* Date and Time */}
            <div className="flex justify-between items-center border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Date & Time</span>
              <span className="text-sm font-medium text-foreground">
                {new Date(payload.paidAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/dashboard/customer/order" className="block">
              <Button className="w-full" size="lg" onClick={() => {}}>
                View My Orders
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
