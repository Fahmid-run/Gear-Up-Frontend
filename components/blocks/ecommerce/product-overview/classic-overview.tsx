import Image from "next/image";
import { Heart, ShieldCheck, Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getGearById } from "@/app/gear/_actions/gearAction";
import { RentalBookingWidget } from "../../rentalBooking-widget";

export default async function ClassicOverview({ id }: { id: string }) {
  let gearData = null;
  if (id) {
    gearData = await getGearById(id);
  }

  const data = gearData.data;
  const availability = data.availability.toLowerCase();

  return (
    <main className="min-h-screen bg-muted/30 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-muted/20 p-4 sm:p-6 lg:p-8">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-inner">
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
                  <span
                    className="size-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  {availability}
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-4 rounded-full shadow-sm"
                  aria-label={`Save ${data.name} to favorites`}
                >
                  <Heart data-icon="inline-start" />
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
                <div className="rounded-xl border bg-background px-2 py-3">
                  <ShieldCheck className="mx-auto mb-1 text-primary" />
                  Quality checked
                </div>
                <div className="rounded-xl border bg-background px-2 py-3">
                  <Truck className="mx-auto mb-1 text-primary" />
                  Easy delivery
                </div>
                <div className="rounded-xl border bg-background px-2 py-3">
                  <Star className="mx-auto mb-1 fill-primary text-primary" />
                  Top rated
                </div>
              </div>
            </div>

            <section className="flex flex-col p-5 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 font-semibold text-primary">
                  <Star className="size-4 fill-current" aria-hidden="true" />
                  4.9
                </div>
                <span className="text-muted-foreground">Highly rated gear</span>
              </div>

              <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {data.name}
              </h1>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">
                  ${data.rentalPricePerDay}
                </span>
                <span className="text-sm text-muted-foreground">/ day</span>
              </div>

              <p className="mt-6 text-base leading-7 text-muted-foreground">
                {data.description}
              </p>

              <div className="my-8 grid gap-3 border-y py-5 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/10">
                    <span
                      className="size-2 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="font-medium capitalize">{availability}</p>
                    <p className="text-muted-foreground">Ready to rent</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="size-4 text-primary" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium">Free shipping</p>
                    <p className="text-muted-foreground">
                      Delivered to your door
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto rounded-2xl border bg-muted/20 p-4 sm:p-5">
                <RentalBookingWidget
                  price={data.rentalPricePerDay}
                  data={data}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
