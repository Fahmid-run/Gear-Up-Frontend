import { PaymentTable } from "@/components/payment/paymnetList";
import { getAllPayments } from "@/service/adminService";
export const dynamic = "force-dynamic";

const PaymentPage = async () => {
  const res = await getAllPayments();

  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <PaymentTable userRole={"admin"} payments={res.data}></PaymentTable>
    </div>
  );
};

export default PaymentPage;
