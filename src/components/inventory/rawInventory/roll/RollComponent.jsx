import React, { useState } from "react";
import FormDialog from "./RollDialog";
import RawInventoryRollComponent from "../roll/RollComponent";

const RollComponent = () => {
  return (
    <div className="ml-8 mr-8">
      <div className="flex justify-end">
        <FormDialog />
      </div>{" "}
      <RawInventoryRollComponent />
    </div>
  );
};

export default RollComponent;
