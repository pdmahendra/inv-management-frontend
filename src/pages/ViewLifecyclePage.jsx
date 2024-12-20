import React from "react";
import { Link } from "react-router-dom";
import OngoingWaitingCompletedTable from "../components/view-lifecycle/OngoingWaitingCompletedTable";
import { useFetchAllLifecycle } from "../api/query/lifecycleApi";

const ViewLifecyclePage = () => {
  const { data: lifecycleResponse, isLoading: isFetching } =
    useFetchAllLifecycle();

  const LifecycleData = lifecycleResponse?.lifecycle || [];

  const ongoingLifecycle = LifecycleData.filter((item) => {
    return !item.markAsDone && item.stages.some((stage) => !stage.isCompleted);
  });

  const completedLifecycle = LifecycleData.filter((item) => {
    return (
      item.markAsDone === true &&
      item.stages.every((stage) => stage.isCompleted === true)
    );
  });
  const waitingLifecycle = LifecycleData.filter((item) => {
    return (
      item.stages.every((stage) => stage.isCompleted === true) &&
      item.markAsDone === false
    );
  });

  return (
    <>
      <h1 className="text-3xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
        View Lifecycle
      </h1>
      <div className="sm:pt-8 sm:pr-16 p-8 max-sm:w-[420px]">
        <div className="flex justify-between items-center">
          <h1 className="sm:pl-4 text-lg">Ongoing</h1>
          <Link
            to={"/view-lifecycle/start-new"}
            className="text-[1rem] rounded-lg bg-[#3F51D7] px-6 py-3 text-white font-bold whitespace-nowrap"
          >
            Start New
          </Link>
        </div>
        <OngoingWaitingCompletedTable
          data={ongoingLifecycle}
          heading="Ongoing"
        />
      </div>
      <div className="sm:pt-8 sm:pr-16 p-8 max-sm:w-[420px]">
        <h1 className="sm:pl-4 text-lg">Waiting</h1>
        <OngoingWaitingCompletedTable
          data={waitingLifecycle}
          heading="Waiting"
        />
      </div>
      <div className="sm:pt-8 sm:pr-16 p-8 max-sm:w-[420px]">
        <h1 className="sm:pl-4 text-lg">Completed</h1>
        <OngoingWaitingCompletedTable
          data={completedLifecycle}
          heading="Completed"
        />
      </div>
    </>
  );
};

export default ViewLifecyclePage;
