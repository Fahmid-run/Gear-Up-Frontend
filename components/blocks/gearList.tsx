"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type GearStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export type GearOrder = {
  id: string;
  productName: string;
  productImage: string;
  startDate: string;
  endDate: string;
  status: GearStatus;
  total: string;
};

const statusStyles: Record<GearStatus, string> = {
  PAID: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  PLACED: "bg-muted text-muted-foreground",
  RETURNED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  PICKED_UP: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const statusLabels: Record<GearStatus, string> = {
  PLACED: "PLACED",
  CONFIRMED: "CONFIRMED",
  PAID: "PAID",
  PICKED_UP: "PICKED_UP",
  RETURNED: "RETURNED",
  CANCELLED: "CANCELLED",
};

const defaultOrders: GearOrder[] = [
  {
    id: "RNT-10245",
    productName: "Sony Alpha Mirrorless Camera",
    productImage: "/products/camera.png",
    startDate: "Aug 2, 2026",
    endDate: "Aug 9, 2026",
    status: "PLACED",
    total: "$189.00",
  },
  {
    id: "RNT-10238",
    productName: "DJI Quadcopter Drone",
    productImage: "/products/drone.png",
    startDate: "Aug 5, 2026",
    endDate: "Aug 8, 2026",
    status: "CANCELLED",
    total: "$142.50",
  },
  {
    id: "RNT-10211",
    productName: "4-Person Camping Tent",
    productImage: "/products/tent.png",
    startDate: "Jul 18, 2026",
    endDate: "Jul 25, 2026",
    status: "CONFIRMED",
    total: "$96.00",
  },
  {
    id: "RNT-10198",
    productName: "Urban Electric Bike",
    productImage: "/products/ebike.png",
    startDate: "Jul 10, 2026",
    endDate: "Jul 14, 2026",
    status: "PAID",
    total: "$220.00",
  },
];

export function GearList({
  orders = defaultOrders,
  onViewAll,
  onViewDetails,
}: {
  orders?: GearOrder[];
  onViewAll?: () => void;
  onViewDetails?: (order: GearOrder) => void;
}) {
  const router = useRouter();
  return (
    <section className="w-full rounded-xl border bg-card text-card-foreground shadow-sm">
      <header className="flex items-center justify-between gap-4 px-6 py-4">
        <h2 className="text-lg font-semibold text-balance">My Gear</h2>
        <Button
          size={"lg"}
          onClick={() => {
            router.push("/dashboard/provider/gear/new");
          }}
        >
          Add Item
        </Button>
      </header>

      <div className="border-t">
        <Table>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src={order.productImage || "/placeholder.svg"}
                        alt={order.productName}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium leading-tight">
                        {order.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.id}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="font-medium">
                  <h2>{order.total}/day</h2>
                  <span className="text-sm text-muted-foreground">
                    price per day
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  <h2>5</h2>
                  <span className="text-sm text-muted-foreground">
                    In stock
                  </span>
                </TableCell>

                {/* <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full font-medium",
                      statusStyles[order.status],
                    )}
                  >
                    {statusLabels[order.status]}
                  </Badge>
                </TableCell> */}
                <TableCell className="pr-6 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push("/dashboard/provider/gear/3123/edit");
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
