import ModernCart from "@/components/blocks/ecommerce/shopping-cart/modern-cart";

const CheckOutPage = () => {
  return (
    <div>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <ModernCart></ModernCart>
      </div>
    </div>
  );
};

export default CheckOutPage;
