import { getGears } from "@/app/gear/_actions/gearAction";
import GearCardItem from "@/components/gearCardItem";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GridList() {
  const data = await getGears();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data?.map((item: any, i: number) => (
          <GearCardItem key={item.id || i} item={item} />
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
