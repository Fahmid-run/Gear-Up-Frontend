import { RentalOrdersTable } from "@/components/blocks/rentalOrders/rentalOrderTable";
import { getAllRentals } from "@/service/adminService";

const AdminRentalOrderspage = async () => {
  const getRentals = await getAllRentals();

  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <RentalOrdersTable
        orders={getRentals.data}
        userRole="Admin"
      ></RentalOrdersTable>
    </div>
  );
};

export default AdminRentalOrderspage;
