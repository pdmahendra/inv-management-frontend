import React from "react";
import AccessoriesComponent from "../components/inventory/rawInventory/accessories/AccessoriesComponent";
import RollComponent from "../components/inventory/rawInventory/roll/RollComponent";

export default function RawInventory() {
  return (
    <div className="md:ml-60 p-6 max-sm:space-y-8">
      <div className="ml-12 max-md:mt-2 text-[2rem] flex justify-between">
        <div>Raw Inventory</div>
      </div>
      <AccessoriesComponent />
      <RollComponent />
    </div>
  );
}
