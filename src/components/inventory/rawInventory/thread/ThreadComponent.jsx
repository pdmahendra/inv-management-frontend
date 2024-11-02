import React, { useState } from "react";
import FormDialog from "./ThreadDialog";
import ThreadTable from "./ThreadTable";
import { useFetchInventoryData } from "../../../../api/query/inventory/invetoryApi";

const ThreadComponent = () => {
  const {
    data: inventoryData = { items: [] },
    isLoading: isFetching,
    refetch,
  } = useFetchInventoryData();
  const filteredInventoryData = inventoryData.items?.filter(
    (item) => item.inventory_type === "raw" && item.sub_category === "thread"
  );

  return (
    <div className="sm:pr-16 w-[380px] sm:w-full sm:pr-16">
      <div className="flex justify-between items-center sm:pl-6 sm:pt-8">
        <h1 className="text-2xl">Thread</h1>
        <FormDialog refetch={refetch} />
      </div>{" "}
      <ThreadTable data={filteredInventoryData} refetch={refetch} />
    </div>
  );
};

export default ThreadComponent;
