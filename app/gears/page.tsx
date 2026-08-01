import MasonryList from "@/components/blocks/ecommerce/product-list/masonry-list";
import MinimalOverview from "@/components/blocks/ecommerce/product-overview/minimal-overview";
import React from "react";

const GearPage = () => {
  return (
    <div>
      <MasonryList></MasonryList>
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
