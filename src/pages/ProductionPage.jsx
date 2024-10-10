import React from "react";
import OngoingCompletedTable from "../components/production/OngoingCompletedTable";
import { Link } from "react-router-dom";

const ProductionPage = () => {
  return (
    <>
      <h1 className="text-3xl max-sm:pl-16 pt-10 sm:pt-8 sm:pl-4">Production</h1>
      <div className="sm:pt-8 sm:pr-16 p-8">
        <div className="flex justify-between items-center">
          <h1 className="sm:pl-4 text-lg">Ongoing</h1>
          <Link
            to={"/production/start-new"}
            className="text-[1rem] rounded-lg bg-[#3F51D7] px-6 py-3 text-white font-bold whitespace-nowrap"
          >
            Start New
          </Link>
        </div>
        <OngoingCompletedTable />
      </div>
      <div className="sm:pt-8 sm:pr-16 p-8">
        <h1 className="sm:pl-4 text-lg">Completed</h1>
        <OngoingCompletedTable />
      </div>
    </>
  );
};

export default ProductionPage;
