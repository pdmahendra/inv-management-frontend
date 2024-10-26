import React, { useState, useEffect } from "react";
import ProgressStepper from "../components/view-lifecycle/ProgressStepper";
import LotStagesTable from "../components/view-lifecycle/LotStagesTable";
import { useParams } from "react-router-dom";
import axios from "../utils/middleware";
import { SERVER_BASE_URL } from "../api/index";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from MUI
import { useLotFetchIssuanceRecords } from "../api/query/issuanceApi";
import LotIssuanceRecordsTable from "../components/view-lifecycle/LotIssuanceRecordsTable";

const ViewDetails = () => {
  const { id } = useParams();
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchLifecycleData = async () => {
    try {
      setLoading(true); // Start loading

      const response = await axios.get(
        `${SERVER_BASE_URL}/lifecycle/getLifecycleById/${id}`
      );
      const lifecycleResponse = response?.data;
      setStages(lifecycleResponse.lifecycle.stages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lifecycle data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLifecycleData();
  }, [id]);

  const { data: lotIssuanceRecordData, isLoading: isFetching } =
    useLotFetchIssuanceRecords(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={50} color="primary" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
        Track Lifecycle
      </h1>
      <div className="max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
        <ProgressStepper />
      </div>
      <div className="sm:pt-8 max-sm:w-[420px]">
        <h1 className="text-2xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
          Lifecycle Stages
        </h1>
        <LotStagesTable data={stages} />
      </div>
      <div className="sm:pt-8 max-sm:w-[420px]">
        <h1 className="text-2xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
          Issuance Records
        </h1>
        <LotIssuanceRecordsTable data={lotIssuanceRecordData} />
      </div>
    </div>
  );
};

export default ViewDetails;
