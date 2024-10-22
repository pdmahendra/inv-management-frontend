import React from "react";
import ProgressStepper from "../components/view-lifecycle/ProgressStepper"
const ViewDetails = () => {
  return (
    <div>
      <h1 className="text-3xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
        Track Lifecycle
      </h1>
      <div className="max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
        <ProgressStepper />
      </div>
    </div>
  );
};

export default ViewDetails;
