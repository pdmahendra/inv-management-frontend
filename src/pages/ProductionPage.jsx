import React from "react";
import OngoingCompletedTable from "../components/production/OngoingCompletedTable";
import { Link } from "react-router-dom";
import { useFetchAllProduction } from "../api/query/productionApi";

const ProductionPage = () => {
  const { data: productionResponse, isLoading: isFetching } =
    useFetchAllProduction();

  const productionData = productionResponse?.productions || [];

  const ongoingProduction = productionData.filter(
    (item) => item.markAsDone === false
  );
  const completedProduction = productionData.filter(
    (item) => item.markAsDone === true
  );

  return (
    <>
      <h1 className="text-3xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">
        Production
      </h1>
      <div className="sm:pt-8 sm:pr-16 p-8 max-sm:w-[420px]">
        <div className="flex justify-between items-center">
          <h1 className="sm:pl-4 text-lg">Ongoing</h1>
          <Link
            to={"/production/start-new"}
            className="text-[1rem] rounded-lg bg-[#3F51D7] px-6 py-3 text-white font-bold whitespace-nowrap"
          >
            Start New
          </Link>
        </div>
        <OngoingCompletedTable data={ongoingProduction} heading={"Ongoing"} />
      </div>
      <div className="sm:pt-8 sm:pr-16 p-8 max-sm:w-[420px]">
        <h1 className="sm:pl-4 text-lg">Completed</h1>
        <OngoingCompletedTable
          data={completedProduction}
          heading={"Completed"}
        />
      </div>
    </>
  );
};

export default ProductionPage;
