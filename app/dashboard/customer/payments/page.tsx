import { PaymentTable } from "@/components/payment/paymnetList";
import { getPaymentList } from "@/service/paymentService";
import React from "react";

const PaymentPage = async () => {
  const res = await getPaymentList();
  console.log(res);
  return (
    <div>
      <PaymentTable payments={res.data}></PaymentTable>
    </div>
  );
};

export default PaymentPage;
