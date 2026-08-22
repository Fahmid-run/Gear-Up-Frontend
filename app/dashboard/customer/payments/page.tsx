import { PaymentTable } from "@/components/payment/paymnetList";
import { getPaymentList } from "@/service/paymentService";
import React from "react";

const PaymentPage = async () => {
  const res = await getPaymentList();
  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <PaymentTable userRole={"customer"} payments={res.data}></PaymentTable>
    </div>
  );
};

export default PaymentPage;
