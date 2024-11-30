import React from "react";
import { useFetchAllActivityLogs } from "../api/query/fetchActivityLogs";
import ActivityLogsTable from "../components/activity-logs/ActivityLogsTable";

const ActivityLogs = () => {
  const { data } = useFetchAllActivityLogs();

  return (
    <div className="p-6">
      <div className="max-sm:mt-2 text-3xl flex justify-between ">
        <div className="pt-2 sm:pt-0 max-sm:pl-12">User Activity Logs</div>
      </div>
      <div className="pt-8 sm:pr-16 max-sm:w-[420px]">
        <ActivityLogsTable data={data} />
      </div>
    </div>
  );
};

export default ActivityLogs;
