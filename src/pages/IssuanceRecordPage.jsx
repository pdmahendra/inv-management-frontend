import React from "react";
import AddMoreInventory from "../components/issuance-records/AddMoreInventory";
import { useFetchIssuanceRecords } from "../api/query/issuanceApi";
import IssuanceRecordsTable from "../components/issuance-records/IssuanceRecordsTable";

const ViewLifecyclePage = () => {
  const { data: issuanceRecordData, isLoading: isFetching } =
    useFetchIssuanceRecords();

  return (
    <>
      <h1 className="text-3xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
        Issuance Records
      </h1>
      <div className="sm:pt-8 sm:pr-16 p-8 max-sm:w-[420px]">
        <div className="flex justify-between items-center">
          <h1 className="sm:pl-4 text-lg"></h1>
          <AddMoreInventory />
        </div>
        <IssuanceRecordsTable data={issuanceRecordData?.issuanceRecords} />
      </div>
    </>
  );
};

export default ViewLifecyclePage;
