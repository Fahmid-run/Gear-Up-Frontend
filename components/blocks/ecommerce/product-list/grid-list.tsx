import { getGears } from "@/app/gear/_actions/gearAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Star, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function GridList() {
  const data = await getGears();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data?.map((item: any, i: number) => (
          <div
            key={i}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Container */}
            <Link
              href={`/gear/${item.id}`}
              className="block relative aspect-[4/3] overflow-hidden bg-muted"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {/* Availability Badge Overlay */}
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                    item.availability === "AVAILABLE"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-rose-500/90 text-white"
                  }`}
                >
                  {item.availability === "AVAILABLE"
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              {/* Title & Rating */}
              <div className="mb-3">
                <h3 className="truncate text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-3.5 w-3.5 ${
                          idx < 4
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-sm text-muted-foreground">
                    ({item.stock} in stock)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 mt-auto">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    ${item.rentalPricePerDay}
                  </span>
                  <span className="text-sm text-muted-foreground">/day</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/gear/${item.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Rent Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/gear/reviews/${item.id}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.data?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative mb-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">No gears available</h3>
          <p className="text-muted-foreground text-center max-w-md">
            We don't have any equipment available at the moment. Check back soon
            for new arrivals!
          </p>
        </div>
      )}
    </div>
  );
}
