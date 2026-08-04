import { PaymentSuccessPage } from "@/components/paymentSuccess";
import { getSinglePayments } from "@/service/paymentService";

const PaymentSuccess = async ({
  params,
}: {
  params: Promise<{
    id?: string;
  }>;
}) => {
  const { id } = await params;

  const payment = await getSinglePayments(id!);

  console.log(payment.data);

  return (
    <div>
      <PaymentSuccessPage payload={payment.data}></PaymentSuccessPage>
    </div>
  );
};

export default PaymentSuccess;
