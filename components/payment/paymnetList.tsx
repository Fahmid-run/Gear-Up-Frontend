"use client";

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
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { getSinglePayments } from "@/service/paymentService";
import { CreditCard } from "lucide-react";

type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

const statusStyles: Record<PaymentStatus, string> = {
  SUCCESS:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  REFUNDED: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  PENDING: "bg-muted text-muted-foreground",
  FAILED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const statusLabels: Record<PaymentStatus, string> = {
  SUCCESS: "SUCCESS",
  REFUNDED: "REFUNDED",
  PENDING: "PENDING",
  FAILED: "FAILED",
};

export function PaymentTable({
  payments,
  userRole,
}: {
  payments: any[];
  userRole: "customer" | "provider" | "admin";
}) {
  const router = useRouter();

  const handlePayment = async (
    paymentStatus: PaymentStatus,
    paymentId: string,
  ) => {
    if (paymentStatus === "PENDING") {
      const getSinglePayment = await getSinglePayments(paymentId);

      // if (getSinglePayment.success) {
      //   window.location.href = getSinglePayment.data.checkoutUrl;
      // } else {
      //   toast.add({
      //     type: "warning",
      //     description: `${getSinglePayment.message}`,
      //   });
      // }
    }
  };
  return (
    <section className="w-full rounded-xl bpayment bg-card text-card-foreground shadow-sm">
      <header className="flex items-center justify-between gap-4 px-6 py-4">
        <h2 className="text-lg font-semibold text-balance">Payments</h2>
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </button>
      </header>

      <div className="bpayment-t">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Id</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>

              <TableHead>Transaction Id</TableHead>

              <TableHead>Paid At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium leading-tight">test</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {payment.amount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full font-medium",
                      statusStyles[payment.status as PaymentStatus],
                    )}
                  >
                    {statusLabels[payment.status as PaymentStatus]}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {payment.transactionId}
                </TableCell>
                <TableCell className="font-medium">{payment.paidAt}</TableCell>

                {payment.status !== "SUCCESS" && userRole === "customer" && (
                  <TableCell className="font-medium">
                    <Button
                      size="sm"
                      onClick={() => handlePayment(payment.status, payment.id)}
                    >
                      Payment
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {payments?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 ">
            <CreditCard className="h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg text-slate-600">
              No Payment Details found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
