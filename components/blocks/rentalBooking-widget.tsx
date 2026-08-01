"use client";

import * as React from "react";
import { CalendarIcon, Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DAILY_PRICE = 35;

function formatDate(date: Date | undefined) {
  if (!date) return "Select date";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function DateField({
  id,
  label,
  value,
  onSelect,
  disabled,
}: {
  id: string;
  label: string;
  value: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              className={cn(
                "w-full justify-between font-normal",
                !value && "text-muted-foreground",
              )}
            >
              {formatDate(value)}
              <CalendarIcon data-icon="inline-end" />
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            disabled={disabled}
            onSelect={(date) => {
              onSelect(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function RentalBookingWidget() {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date(2024, 4, 20),
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    new Date(2024, 4, 23),
  );

  const days = React.useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff = Math.round(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const total = days * DAILY_PRICE;

  const handleStartSelect = (date: Date | undefined) => {
    setStartDate(date);
    // Keep the range valid: clear end date if it is now before the start.
    if (date && endDate && endDate.getTime() <= date.getTime()) {
      setEndDate(undefined);
    }
  };

  return (
    <Card className="w-full max-w-md bg-muted/40">
      <CardContent className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-balance">
          Select Rental Dates
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DateField
            id="start-date"
            label="Start Date"
            value={startDate}
            onSelect={handleStartSelect}
          />
          <DateField
            id="end-date"
            label="End Date"
            value={endDate}
            onSelect={setEndDate}
            disabled={(date) =>
              startDate ? date.getTime() <= startDate.getTime() : false
            }
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t pt-4">
          <div className="flex flex-col">
            <span className="font-bold">Total Price</span>
            <span className="text-sm text-muted-foreground">
              ${DAILY_PRICE} x {days} {days === 1 ? "day" : "days"}
            </span>
          </div>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="w-full bg-green-700 text-white hover:bg-green-800"
            disabled={days === 0}
          >
            Rent Now
          </Button>
          <Button variant="outline" className="w-full">
            <Heart data-icon="inline-start" />
            Add to Wishlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
