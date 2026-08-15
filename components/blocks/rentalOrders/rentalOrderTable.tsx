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
import { updateRentalORderStatus } from "@/service/rentalItem";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { paymentInitialization } from "@/service/paymentService";
import { createReview } from "@/service/review";
import { ShoppingBagIcon } from "lucide-react";

type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

const statusStyles: Record<RentalStatus, string> = {
  PICKED_UP:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  RETURNED: "bg-muted text-muted-foreground",
  PLACED:
    "bg-orange-100 text-black-700 dark:bg-orange-500/15 dark:text-white-400",
  PAID: "bg-purple-100 text-black-700 dark:bg-purple-500/15 dark:text-white-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const statusLabels: Record<RentalStatus, string> = {
  PLACED: "PLACED",
  CONFIRMED: "CONFIRMED",
  PAID: "PAID",
  PICKED_UP: "PICKED_UP",
  RETURNED: "RETURNED",
  CANCELLED: "CANCELLED",
};

export function RentalOrdersTable({
  orders,
  userRole,
  onViewAll,
  onViewDetails,
}: {
  orders?: any[];
  userRole: "Customer" | "Provider" | "Admin";
  onViewAll?: () => void;
  onViewDetails?: (order: any) => void;
}) {
  const router = useRouter();

  const handlePayment = async (rentalOrderId: string) => {
    const paymentInit = await paymentInitialization(rentalOrderId);

    if (paymentInit.success) {
      window.location.href = paymentInit.data.checkoutUrl;
    } else {
      toast.add({
        type: "warning",
        description: `${paymentInit.message}`,
      });
    }
  };

  const updateRentalStatus = async (
    orderId: string,
    status: "CONFIRMED" | "PICKED_UP" | "RETURNED",
  ) => {
    try {
      const res = await updateRentalORderStatus(orderId, status);

      if (res.success) {
        toast.add({
          type: "success",
          description: "status updated",
        });

        router.refresh();
      }

      if (!res.success) {
        toast.add({
          type: "error",
          description: res.message,
        });

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              <TableHead className="pl-6">Order ID</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              {userRole !== "Admin" && (
                <TableHead className="pr-6 text-right">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {order.id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(order.startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}{" "}
                  &ndash;{" "}
                  {new Date(order.endDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full font-medium",
                      statusStyles[order.rentalStatus],
                    )}
                  >
                    {statusLabels[order.rentalStatus]}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  $ {order.totalAmount}
                </TableCell>

                <TableCell className="pr-6 text-right">
                  {userRole === "Provider" && (
                    <div className="flex justify-end gap-2">
                      {order.rentalStatus === "PLACED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateRentalStatus(order.id, "CONFIRMED")
                          }
                        >
                          Confirm
                        </Button>
                      )}

                      {order.rentalStatus === "PAID" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateRentalStatus(order.id, "PICKED_UP")
                          }
                        >
                          Mark Picked Up
                        </Button>
                      )}
                    </div>
                  )}

                  {userRole === "Customer" &&
                    order.rentalStatus === "CONFIRMED" && (
                      <Button size="sm" onClick={() => handlePayment(order.id)}>
                        Payment
                      </Button>
                    )}

                  {userRole === "Customer" &&
                    order.rentalStatus === "RETURNED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/dashboard/customer/review/${order.items[0].gearItemId}`,
                          )
                        }
                      >
                        Leave Review
                      </Button>
                    )}

                  {userRole === "Provider" &&
                    order.rentalStatus === "PICKED_UP" && (
                      <Button
                        size="sm"
                        type="submit"
                        onClick={() => updateRentalStatus(order.id, "RETURNED")}
                      >
                        Return
                      </Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 ">
            <ShoppingBagIcon className="h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg text-slate-600">No gears found</p>
          </div>
        )}
      </div>
    </section>
  );
}
