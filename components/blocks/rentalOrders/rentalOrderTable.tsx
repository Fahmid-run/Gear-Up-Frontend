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

type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

const statusStyles: Record<RentalStatus, string> = {
  PAID: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  PLACED: "bg-muted text-muted-foreground",
  RETURNED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  PICKED_UP: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
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
  userRole: "Customer" | "Provider";
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
    status: "CONFIRMED" | "PICKED_UP",
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
              <TableHead className="pl-6">Order</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium leading-tight">test</p>
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
                      statusStyles[order.rentalStatus],
                    )}
                  >
                    {statusLabels[order.rentalStatus]}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {order.totalAmount}
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

                      {order.rentalStatus === "CONFIRMED" && (
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
