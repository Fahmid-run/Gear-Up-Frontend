import { Button } from "@/components/ui/button";
import { Star, Truck, ShieldCheck, Heart } from "lucide-react";
import { RentalBookingWidget } from "../../rentalBooking-widget";

export default function ClassicOverview() {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Modern watch with leather strap"
            className="h-full w-full object-cover"
            width={800}
            height={800}
          />
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="outline"
              className="bg-background/80 rounded-full backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="fill-primary text-primary h-4 w-4" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-muted-foreground text-sm">
                (128 reviews)
              </span>
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-bold">Classic Leather Watch</h1>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="text-2xl font-bold">$299.00</span>
          </div>

          <p className="text-muted-foreground mb-6">
            Elevate your style with our Classic Leather Watch. Featuring premium
            materials, precise movement, and timeless design that complements
            any outfit.
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>In Stock</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Free Shipping</span>
            </div>
          </div>
          <RentalBookingWidget></RentalBookingWidget>
        </div>
      </div>
    </div>
  );
}
