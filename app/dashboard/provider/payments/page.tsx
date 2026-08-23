import { PaymentTable } from "@/components/payment/paymnetList";
import { getAllPayments } from "@/service/adminService";
import { getProviderPayments } from "@/service/providerService";
export const dynamic = "force-dynamic";

const PaymentPage = async () => {
  const res = await getProviderPayments();

  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <PaymentTable userRole={"provider"} payments={res.data}></PaymentTable>
    </div>
  );
};

export default PaymentPage;
