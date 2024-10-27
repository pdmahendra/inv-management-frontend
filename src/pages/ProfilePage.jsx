import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import CuttingAlotTable from "../components/profile/CuttingAlotTable";
import { useFetchMyProduction } from "../api/query/productionApi";

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

  console.log(myProductionData);

  return (
    <div>
      <div className="flex justify-center items-center text-3xl mt-10">
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
    </div>
  );
};

export default ProfilePage;
