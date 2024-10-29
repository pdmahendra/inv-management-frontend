import React, { useState } from "react";
import FormDialog from "./ThreadDialog";
import ThreadTable from "./ThreadTable";

const AstarComponent = () => {

    
  return (
    <div className="sm:pr-16 w-[380px] sm:w-full sm:pr-16">
      <div className="flex justify-between items-center sm:pl-6 sm:pt-8">
        <h1 className="text-2xl">Thread</h1>
        <FormDialog />
      </div>{" "}
      <ThreadTable />
    </div>
  );
};

export default AstarComponent;
