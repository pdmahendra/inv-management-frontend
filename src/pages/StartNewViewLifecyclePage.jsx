import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs"; // Import dayjs
import AddMoreLifecycleTable from "../components/view-lifecycle/AddMoreLifecycleTable";
import AddMoreLifecycleDialog from "../components/view-lifecycle/AddMoreLifecycleDialog";
import { useNavigate } from "react-router-dom";
import { useFetchAllUsers } from "../api/query/fetchAllUsers";
import { useStartNewLifecycle } from "../api/query/lifecycleApi";
import { toast } from "react-hot-toast";

const StartNewLifecyclePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [price, setPrice] = useState("");
  const [addInfo, setAddInfo] = useState("");
  const [data, setData] = useState([]);

  //handle assignTo field
  const handleChange = (event) => {
    const value = event.target.value;
    setAssignTo(value === "others" ? "others" : value);
  };

  //handle expected date field
  const handleDateChange = (newValue) => {
    if (newValue) {
      setExpectedDeliveryDate(newValue); // Set the raw Dayjs object
    } else {
      setExpectedDeliveryDate(null); // Reset if no date is selected
    }
  };

  //fetch all users to show name in dropdown
  const { data: peopleData = [], isLoading: isFetching } = useFetchAllUsers();
  const { mutate: startNewLifecycle, isLoading } = useStartNewLifecycle();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDeliveryDate = expectedDeliveryDate
      ? expectedDeliveryDate.format("DD/MM/YYYY")
      : "";

    const stageDate = {
      expectedDeliveryDate: formattedDeliveryDate,
      price,
      assignTo: assignTo === "Others" ? "others" : assignTo,
      name: assignTo === "Others" ? name : undefined,
      contact: assignTo === "Others" ? contact : undefined,
      additionalInformation: addInfo,
    };

    const lifecycleData = {
      rolls: data,
      stages: [stageDate],
    };

    startNewLifecycle(lifecycleData, {
      onSuccess: (response) => {
        navigate("/view-lifecycle");
        toast.success("Lifecycle started successfully!");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="sm:pr-20 pb-10 pt-5 max-sm:w-[420px]">
      <div className="flex justify-between items-center max-sm:pr-8">
        <h1 className="text-3xl sm:pt-8 sm:pl-4 max-sm:pl-16">Start New</h1>
        <div className="pt-6">
          <AddMoreLifecycleDialog setData={setData} data={data} />
        </div>
      </div>{" "}
      <div className="p-8">
        <AddMoreLifecycleTable data={data} />
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
        )}{" "}
        <div className="mt-4">
          <label className="block mb-2 text-lg font-medium" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
            placeholder="Enter your contact"
          />
        </div>{" "}
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
              value={expectedDeliveryDate} // Directly use the Dayjs object
              onChange={handleDateChange}
              renderInput={(params) => <input {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-lg font-medium" htmlFor="addInfo">
            Additional Info
          </label>
          <input
            type="Textarea"
            id="addInfo"
            name="addInfo"
            value={addInfo}
            onChange={(e) => setAddInfo(e.target.value)}
            className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
            placeholder="Enter Additional Details"
          />
        </div>{" "}
      </div>
      <div className="pt-8 ml-10 flex justify-start items-center gap-4">
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

export default StartNewLifecyclePage;
