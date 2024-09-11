import React, { useState } from "react";
import FormDialog from "./AstarDialog";
import RawInventoryAstarTable from "../astar/RawInventoryAstarTable";
import { useFetchInventoryData } from "../../../../api/query/inventory/invetoryApi";

const AstarComponent = () => {
  const {
    data: inventoryData = { items: [] },
    isLoading: isFetching,
    refetch,
  } = useFetchInventoryData();
  const filteredInventoryData = inventoryData.items?.filter(
    (item) => item.inventory_type === "raw" && item.sub_category === "astar"
  );
    
  return (
    <div className="sm:ml-8 sm:pr-16 w-[380px] sm:w-full">
      <div className="flex justify-between items-center sm:pl-6 pt-8">
        <h1 className="text-2xl">Astar</h1>
        <FormDialog refetch={refetch} />
      </div>{" "}
      <RawInventoryAstarTable data={filteredInventoryData} refetch={refetch}/>
    </div>
  );
};

export default AstarComponent;
