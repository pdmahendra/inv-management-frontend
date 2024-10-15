import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs"; // Import dayjs
import AddMoreRollTable from "../components/production/AddMoreRollTable";
import AddMoreDialog from "../components/production/AddMoreDialog";
import { useNavigate } from "react-router-dom";
import { useFetchAllUsers } from "../api/query/fetchAllUsers";
import { useStartNewProduction } from "../api/query/productionApi";
import { toast } from "react-hot-toast";

const StartNewProductionPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [data, setData] = useState([]);
  console.log(data);
  

  //handle assignTo field
  const handleChange = (event) => {
    const value = event.target.value;
    setAssignTo(value === "others" ? "others" : value);
  };

  //handle expected date field
  const handleDateChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).format("MM/DD/YYYY")
      : null;
    setExpectedDeliveryDate(formattedDate);
  };

  //fetch all users to show name in dropdown
  const {
    data: peopleData = [],
    isLoading: isFetching,
    refetch,
  } = useFetchAllUsers();
  const { mutate: startNewProduction, isLoading } = useStartNewProduction();

  const handleSubmit = (e) => {
    e.preventDefault();

    const productionData = {
      rolls: data,
      expectedDeliveryDate: expectedDeliveryDate,
      assignTo: assignTo === "Others" ? "others" : assignTo,
      name: assignTo === "Others" ? name : undefined,
      contact: assignTo === "Others" ? contact : undefined,
    };

    startNewProduction(productionData, {
      onSuccess: (response) => {
        navigate("/production");
        toast.success("Production started successfully!");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.error || "An error occurred";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="sm:pr-20 pb-10 pt-5 max-sm:w-[420px]">
      <div className="flex justify-between items-center max-sm:pr-8">
        <h1 className="text-3xl sm:pt-8 sm:pl-4 max-sm:pl-16">Start New</h1>
        <div className="pt-6">
          <AddMoreDialog setData={setData} />
        </div>
      </div>{" "}
      <div className="p-8">
        <AddMoreRollTable data={data} />
        <div className="mt-8">
          <label className="block mb-2 text-lg font-medium" htmlFor="assignTo">
            Assign To
          </label>
          <select
            id="assignTo"
            name="assignTo"
            value={assignTo}
            onChange={handleChange}
            className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
          >
            <option value="" disabled>
              Select User
            </option>
            {peopleData?.users?.map((user, index) => (
              <option key={index} value={user._id}>
                {user.name}
              </option>
            ))}
            <option value="Others">Others</option>
          </select>
        </div>
        {assignTo === "Others" ? (
          <>
            <div className="mt-4">
              <label className="block mb-2 text-lg font-medium" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
                placeholder="Enter your name"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-lg font-medium"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                type="number"
                id="contact"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
                placeholder="Enter your contact"
              />
            </div>{" "}
          </>
        ) : (
          <div></div>
        )}
        <div className="mt-4">
          <label
            className="block mb-2 text-lg font-medium"
            htmlFor="expectedDeliveryDate"
          >
            Expected Delivery Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                },
              }}
              value={
                expectedDeliveryDate
                  ? dayjs(expectedDeliveryDate, "MM/DD/YYYY")
                  : null
              }
              onChange={handleDateChange}
              renderInput={(params) => <input {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="pt-8 flex justify-start items-center gap-4">
        <button className="text-red-500 px-12 py-2 border-2 rounded-xl">
          Cancel
        </button>
        <button
          className="text-white bg-[#3F51D7] font-medium px-12 py-2 border-2 rounded-xl"
          onClick={handleSubmit}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartNewProductionPage;
