import React, { useState } from "react";
import FormDialog from "../roll/RollDialog";
import RawInventoryRollTable from "../roll/RawInventoryRollTable"
const RollComponent = () => {
  return (
    <div className="ml-8 mr-8">
      <div className="flex justify-end">
        <FormDialog />
      </div>{" "}
      <RawInventoryRollTable />
    </div>
  );
};

export default RollComponent;
