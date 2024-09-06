import React, { useState } from "react";
import FormDialog from "../roll/RollDialog";
import RawInventoryRollTable from "../roll/RawInventoryRollTable"
const RollComponent = () => {
  return (
    <div className="sm:ml-8 sm:pr-16 w-[380px] sm:w-full">
      <div className="flex justify-end">
        <FormDialog />
      </div>{" "}
      <RawInventoryRollTable />
    </div>
  );
};

export default RollComponent;
