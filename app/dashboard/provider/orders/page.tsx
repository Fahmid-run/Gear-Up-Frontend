import { RentalOrdersTable } from "@/components/blocks/rentalOrders/rentalOrderTable";
import React from "react";

const RentalOrderspage = () => {
  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <RentalOrdersTable></RentalOrdersTable>
    </div>
  );
};

export default RentalOrderspage;
