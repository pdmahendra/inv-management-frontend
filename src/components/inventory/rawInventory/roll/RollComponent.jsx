import React, { useState } from "react";
import FormDialog from "../roll/RollDialog";
import RawInventoryRollTable from "../roll/RawInventoryRollTable";
import { useFetchInventoryData } from "../../../../api/query/inventory/invetoryApi";

const RollComponent = () => {
  const {
    data: inventoryData = { items: [] },
    isLoading: isFetching,
    refetch,
  } = useFetchInventoryData();
  const filteredInventoryData = inventoryData.items?.filter(
    (item) => item.inventory_type === "raw" && item.sub_category === "roll"
  );

  return (
    <div className="sm:ml-8 sm:pr-16 w-[380px] sm:w-full">
      <div className="flex justify-between items-center sm:pl-6 pt-8">
        <h1 className="text-2xl">Roll</h1> <FormDialog refetch={refetch} />
      </div>{" "}
      <RawInventoryRollTable data={filteredInventoryData} refetch={refetch} />
    </div>
  );
};

export default RollComponent;
