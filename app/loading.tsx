import HomeSceleton from "@/components/sceletons/home-page";
import NavSceleton from "@/components/sceletons/nav-sceleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <NavSceleton></NavSceleton>
      <HomeSceleton></HomeSceleton>
    </div>
  );
};

export default loading;
