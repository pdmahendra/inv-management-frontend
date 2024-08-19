import React from "react";
import RawInventoryTable from '../components/inventory/rawInventory/RawInventoryTable'

export default function ReadyInventory() {
  const peopleData = [
    {
      id: 1,
      name: "Button",
      quantity: "8",
      minimum: "4",
      status: "green",
    },
    {
      id: 2,
      name: "Cloth",
      role: "Admin",
      phone: "1234567890",
      username: "Adway7103",
    },
  ];
  return (
    <div className="">
      <div className="md:ml-60 p-6">
      <div className="ml-12 max-md:mt-2 text-[2rem] flex justify-between">
      <div>Ready Inventory</div>
        </div>
        <div className="flex justify-between w-[380px] sm:w-full">
        <div className=" max-sm:mt-8 w-full sm:p-8">
        <div className="flex justify-end mb-6">
              <button className="text-[1rem] rounded-lg bg-[#3F51D7] px-8 py-4 text-white font-bold whitespace-nowrap">
                Add More
              </button>
            </div>
            <RawInventoryTable data={peopleData} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
