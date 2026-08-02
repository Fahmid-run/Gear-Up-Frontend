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

type RentalStatus = "active" | "upcoming" | "returned" | "overdue";

export type RentalOrder = {
  id: string;
  productName: string;
  productImage: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  total: string;
};

const statusStyles: Record<RentalStatus, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  returned: "bg-muted text-muted-foreground",
  overdue: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const statusLabels: Record<RentalStatus, string> = {
  active: "Active",
  upcoming: "Upcoming",
  returned: "Returned",
  overdue: "Overdue",
};

const defaultOrders: RentalOrder[] = [
  {
    id: "RNT-10245",
    productName: "Sony Alpha Mirrorless Camera",
    productImage: "/products/camera.png",
    startDate: "Aug 2, 2026",
    endDate: "Aug 9, 2026",
    status: "active",
    total: "$189.00",
  },
  {
    id: "RNT-10238",
    productName: "DJI Quadcopter Drone",
    productImage: "/products/drone.png",
    startDate: "Aug 5, 2026",
    endDate: "Aug 8, 2026",
    status: "upcoming",
    total: "$142.50",
  },
  {
    id: "RNT-10211",
    productName: "4-Person Camping Tent",
    productImage: "/products/tent.png",
    startDate: "Jul 18, 2026",
    endDate: "Jul 25, 2026",
    status: "returned",
    total: "$96.00",
  },
  {
    id: "RNT-10198",
    productName: "Urban Electric Bike",
    productImage: "/products/ebike.png",
    startDate: "Jul 10, 2026",
    endDate: "Jul 14, 2026",
    status: "overdue",
    total: "$220.00",
  },
];

export function RentalOrdersTable({
  orders = defaultOrders,
  onViewAll,
  onViewDetails,
}: {
  orders?: RentalOrder[];
  onViewAll?: () => void;
  onViewDetails?: (order: RentalOrder) => void;
}) {
  return (
    <section className="w-full rounded-xl border bg-card text-card-foreground shadow-sm">
      <header className="flex items-center justify-between gap-4 px-6 py-4">
        <h2 className="text-lg font-semibold text-balance">Rental orders</h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </button>
      </header>

      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Order</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
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
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {order.startDate} &ndash; {order.endDate}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full font-medium",
                      statusStyles[order.status],
                    )}
                  >
                    {statusLabels[order.status]}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{order.total}</TableCell>
                <TableCell className="pr-6 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails?.(order)}
                  >
                    View details
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
