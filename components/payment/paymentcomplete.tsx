"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";

interface PaymentItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface OrderSummaryData {
  orderId: string;
  itemName: string;
  rentalDates: {
    from: string;
    to: string;
  };
  pricePerDay: number;
  rentalDays: number;
  totalAmount: number;
}

interface CompletePaymentProps {
  orderSummary: OrderSummaryData;
  item: PaymentItem;
  onPaymentClick?: () => void;
}

export default function CompletePayment({
  orderSummary,
  item,
  onPaymentClick,
}: CompletePaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onPaymentClick?.();
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Complete Payment
        </h1>
        <p className="text-muted-foreground">
          Review your order and complete the payment
        </p>
      </div>

      {/* Main Content - Two Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {/* Order Summary Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Order Summary
            </h2>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            {/* Order ID */}
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="text-lg font-semibold text-foreground font-mono">
                #{orderSummary.orderId}
              </p>
            </div>

            {/* Item Name */}
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-1">Item Name</p>
              <p className="text-lg font-semibold text-foreground">
                {orderSummary.itemName}
              </p>
            </div>

            {/* Rental Dates */}
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Rental Dates</p>
              <div className="flex items-center gap-2 text-foreground">
                <span className="font-medium">
                  {orderSummary.rentalDates.from}
                </span>
                <ArrowRight className="w-4 h-4 text-accent" />
                <span className="font-medium">
                  {orderSummary.rentalDates.to}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {orderSummary.rentalDays} days
              </p>
            </div>

            {/* Price Per Day */}
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-1">
                Price per Day
              </p>
              <p className="text-lg font-semibold text-foreground">
                ${orderSummary.pricePerDay.toFixed(2)}
              </p>
            </div>

            {/* Total Amount */}
            <div className="pt-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  ${orderSummary.totalAmount.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {orderSummary.pricePerDay.toFixed(2)} ×{" "}
                  {orderSummary.rentalDays} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Item Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col">
          <div className="mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Item Details
            </h2>
          </div>

          {/* Item Image */}
          <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-muted border border-border">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          {/* Item Info */}
          <div className="space-y-4 flex-1">
            {/* Item Name */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Item Name</p>
              <p className="text-lg font-semibold text-foreground line-clamp-2">
                {item.name}
              </p>
            </div>

            {/* Category */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                {item.category}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Price and Pay Button */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Payment Amount
                </span>
                <span className="text-2xl font-bold text-foreground">
                  ${orderSummary.totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <CreditCard className="w-5 h-5 group-hover:animate-pulse" />
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="mt-12 max-w-6xl mx-auto p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <p className="text-center text-sm text-muted-foreground">
          🔒 Your payment information is secure and encrypted. We use
          industry-standard SSL encryption to protect your data.
        </p>
      </div>
    </div>
  );
}
