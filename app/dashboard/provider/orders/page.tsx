import { RentalOrdersTable } from "@/components/blocks/rentalOrders/rentalOrderTable";
import {
  getMyRentalOrders,
  getProviderRentalOrders,
} from "@/service/rentalItem";
import React from "react";

const RentalOrderspage = async () => {
  const getRentals = await getProviderRentalOrders();

  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <RentalOrdersTable
        orders={getRentals.data}
        userRole="Provider"
      ></RentalOrdersTable>
    </div>
  );
};

export default RentalOrderspage;
