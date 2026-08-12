import { Button } from "@/components/ui/button";
import { Star, Truck, Heart } from "lucide-react";
import { RentalBookingWidget } from "../../rentalBooking-widget";
import { getGearById } from "@/app/gear/_actions/gearAction";

export default async function ClassicOverview({ id }: { id: string }) {
  let gearData = null;
  if (id) {
    gearData = await getGearById(id);
  }

  const data = gearData.data;

  return (
    <>
      <div className="mx-auto w-full max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
              </div>
            </div>

            <h1 className="mb-2 text-3xl font-bold">{data.name}</h1>
            <div className="mb-6 flex items-baseline gap-4">
              <span className="text-2xl font-bold">
                ${data.rentalPricePerDay}
              </span>
            </div>

            <p className="text-muted-foreground mb-6">{data.description}</p>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>{data.availability}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
            </div>
            <RentalBookingWidget
              price={data.rentalPricePerDay}
              data={data}
            ></RentalBookingWidget>
          </div>
        </div>
      </div>

      {/* <div className="space-y-6 lg:col-span-2">
        <div>
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="flex h-full flex-col md:flex-row">
                  {/* Product Image */}
      {/* <div className="relative h-auto w-full md:w-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover md:w-32"
                    /> */}
      {/* </div> */}

      {/* Product Details */}
      {/* <div className="flex-1 p-6 pb-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {item.color} • {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        // onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          // onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          // onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.originalPrice && (
                          <div className="text-muted-foreground text-sm line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      {/* </div> */}
    </>
  );
}
