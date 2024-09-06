import React from "react";
import AccessoriesComponent from "../components/inventory/rawInventory/accessories/AccessoriesComponent";
import RollComponent from "../components/inventory/rawInventory/roll/RollComponent";
import QRCodeScanner from "../components/inventory/rawInventory/roll/Scanner"

export default function RawInventory() {
  return (
    <div className="">
      <div className="md:ml-60 p-6">
        <div className="ml-12 max-md:mt-2 text-[2rem] flex justify-between">
          <div>Raw Inventory</div>
        </div>
        <AccessoriesComponent />
        <RollComponent />
      </div>
        <QRCodeScanner />
    </div>
  );
}
