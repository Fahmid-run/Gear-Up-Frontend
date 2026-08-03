import { RentalOrdersTable } from "@/components/blocks/rentalOrders/rentalOrderTable";
import { getMyRentalOrders } from "@/service/rentalItem";
import React from "react";

const RentalOrderspage = async () => {
  const getRentals = await getMyRentalOrders();

  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <RentalOrdersTable orders={getRentals.data}></RentalOrdersTable>
    </div>
  );
};

export default RentalOrderspage;
