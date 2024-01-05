import React from "react";
import DataUser from "./ViewData/DataUser";
import DataPelayanan from "./ViewData/DataPelayanan";

const ViewData = () => {
  return (
    <div className="w-full">
      <div className="space-y-12 p-6 sm:p-20">
        <DataUser />
        <DataPelayanan />
      </div>
    </div>
  );
};

export default ViewData;
