import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import CuttingAlotTable from "../components/profile/CuttingAlotTable";
import LifecycleAlotTable from "../components/profile/OngoingLifecycleAlotTable";
import { useFetchMyProduction } from "../api/query/productionApi";
import { useFetchMyLifecycle } from "../api/query/lifecycleApi";
import CompletedLifecycleAlotTable from "../components/profile/CompletedLifecycleAlotTable";
import AllotedIssuanceRecordsTable from "../components/profile/AllotedIssuanceRecordsTable";
import { useFetchMyIssuanceRecords } from "../api/query/issuanceApi";
const ProfilePage = () => {
  const { user } = useUser();
  const [myProductionData, setMyProductionData] = useState([]);

  const { data: myProductionResponse, isLoading: isFetching } =
    useFetchMyProduction();
  useEffect(() => {
    if (myProductionResponse) {
      setMyProductionData(myProductionResponse.productions);
    }
  }, [myProductionResponse]);

  const { data: myLifecycleResponse, isLoading: isLifecycleFetching } =
    useFetchMyLifecycle();

  const ongoingLifecycle = myLifecycleResponse?.lifecycle.filter((item) => {
    return !item.markAsDone && item.stages.some((stage) => !stage.isCompleted);
  });

  const completedStages = myLifecycleResponse?.lifecycle.flatMap(
    (lifecycle) => {
      const rollNo = lifecycle.rolls[0].rollNo;
      return lifecycle.stages
        .filter((stage) => stage.isCompleted)
        .map((stage) => ({
          ...stage,
          rollNo: rollNo,
          lotNo: lifecycle.lotNo,
          updatedAt: lifecycle.updatedAt,
        }));
    }
  );

  const { data: issuanceRecordData, isLoading: isIssuanceFetching } =
    useFetchMyIssuanceRecords();

  return (
    <div className="max-sm:px-10">
      <div className="max-sm:ml-6 sm:flex justify-center items-center text-3xl mt-10">
        User Profile
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-lg font-medium" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={user?.name}
          readOnly
          className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
          placeholder="Enter your name"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-lg font-medium" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={user?.username}
          readOnly
          className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
          placeholder="Enter your username"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-lg font-medium" htmlFor="phone">
          Phone No.
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={user?.phoneNo}
          readOnly
          className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-lg font-medium" htmlFor="usertype">
          Usertype
        </label>
        <input
          type="text"
          id="usertype"
          name="usertype"
          value={user?.userType}
          readOnly
          className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
          placeholder="Enter your user type"
        />
      </div>
      <div>
        <div className="sm:pt-8 sm:pr-16 max-sm:w-[420px]">
          {" "}
          <h1 className="text-2xl font-medium">Alloted Cuttings</h1>
          <CuttingAlotTable heading={"Completed"} data={myProductionData} />
        </div>
      </div>
      <div>
        <div className="sm:pt-8 sm:pr-16 max-sm:w-[420px]">
          {" "}
          <h1 className="text-2xl font-medium">Alloted Lifecycle Stages</h1>
          <div className="sm:pt-8">
            <h1 className="sm:pl-4 text-lg">Ongoing</h1>
            <LifecycleAlotTable data={ongoingLifecycle} heading="Ongoing" />
          </div>
          <div className="sm:pt-8">
            <h1 className="sm:pl-4 text-lg">Completed</h1>
            <CompletedLifecycleAlotTable
              data={completedStages}
              heading="Completed"
            />
          </div>
        </div>
      </div>{" "}
      <div className="">
        <div className="sm:pt-8 sm:pr-16 max-sm:w-[420px]">
          {" "}
          <h1 className="text-2xl font-medium">Issued Inventory Items</h1>
          <AllotedIssuanceRecordsTable
            data={issuanceRecordData?.issuanceRecords}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
