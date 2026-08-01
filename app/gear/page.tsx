import GridList from "@/components/blocks/ecommerce/product-list/grid-list";
import MinimalOverview from "@/components/blocks/ecommerce/product-overview/minimal-overview";
import React from "react";

const GearPage = () => {
  return (
    <div>
      <GridList></GridList>
    </div>
  );
};

export const GearDetails = () => {
  return (
    <>
      <MinimalOverview></MinimalOverview>
    </>
  );
};

export default GearPage;
