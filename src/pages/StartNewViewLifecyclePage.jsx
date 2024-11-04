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
import { useFetchItemsBySubcategory } from "../api/query/inventory/invetoryApi";

const StartNewLifecyclePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [price, setPrice] = useState("");
  const [addInfo, setAddInfo] = useState("");
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [accessories, setAccessories] = useState("");
  const [mainThread, setMainThread] = useState("");
  const [contrastThread, setContrastThread] = useState("");
  const [insideThread, setInsideThread] = useState("");
  const [washCard, setWashCard] = useState("");
  const [embroidery, setEmbroidery] = useState("");
  const [zip, setZip] = useState("");

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
      type: type,
      rolls: data,
      stages: [stageDate],
      brand,
      accessories,
      mainThread,
      contrastThread,
      insideThread,
      washCard,
      embroidery,
      zip,
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

  //fetch all inventory items
  const { data: accessoriesResponse, isLoading: isAccessoriesFetching } =
    useFetchItemsBySubcategory("accessories");
  const { data: threadResponse, isLoading: isthreadFetching } =
    useFetchItemsBySubcategory("thread");

  console.log(accessoriesResponse);
  console.log(threadResponse);

  return (
    <div className="sm:pr-20 pb-10 pt-5 max-sm:w-[420px]">
      <div className="flex justify-between items-center max-sm:pr-8">
        <h1 className="text-3xl sm:pt-8 sm:pl-4 max-sm:pl-16">Start New</h1>
        <div className="pt-6">
          <AddMoreLifecycleDialog
            setData={setData}
            data={data}
            setType={setType}
            type={type}
          />
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
        <div>
          <h1 className="text-2xl sm:pt-14 max-sm:pl-16">
            Inventory Specifications
          </h1>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="brand">
              Brand{" "}
            </label>
            <input
              type="Textarea"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
              placeholder="Enter Additional Details"
            />
          </div>{" "}
          <div className="mt-8">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="accessories"
            >
              Accessories{" "}
            </label>
            <select
              id="accessories"
              name="accessories"
              value={accessories}
              onChange={(e) => setAccessories(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
            >
              <option value="" disabled>
                Select Accessories
              </option>

              {accessoriesResponse?.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>{" "}
          <div className="mt-8">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="mainThread"
            >
              Main Thread{" "}
            </label>
            <select
              id="mainThread"
              name="mainThread"
              value={mainThread}
              onChange={(e) => setMainThread(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
            >
              <option value="" disabled>
                Select Main Thread
              </option>

              {threadResponse?.map((item, index) => {
                return item.extra_fields?.map((extraField, extraIndex) => {
                  const color = extraField.color || "";

                  if (color) {
                    return (
                      <option key={`${index}-${extraIndex}`} value={color}>
                        {color}
                      </option>
                    );
                  }
                  return null;
                });
              })}
            </select>
          </div>{" "}
          <div className="mt-8">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="contrastThread"
            >
              Contrast Thread{" "}
            </label>
            <select
              id="contrastThread"
              name="contrastThread"
              value={contrastThread}
              onChange={(e) => setContrastThread(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
            >
              <option value="" disabled>
                Select Contrast Thread
              </option>

              {threadResponse?.map((item, index) => {
                return item.extra_fields?.map((extraField, extraIndex) => {
                  const color = extraField.color || "";

                  if (color) {
                    return (
                      <option key={`${index}-${extraIndex}`} value={color}>
                        {color}
                      </option>
                    );
                  }
                  return null;
                });
              })}
            </select>
          </div>{" "}
          <div className="mt-8">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="insideThread"
            >
              Inside Thread{" "}
            </label>
            <select
              id="insideThread"
              name="insideThread"
              value={insideThread}
              onChange={(e) => setInsideThread(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
            >
              <option value="" disabled>
                Select Inside Thread
              </option>

              {threadResponse?.map((item, index) => {
                return item.extra_fields?.map((extraField, extraIndex) => {
                  const color = extraField.color || "";

                  if (color) {
                    return (
                      <option key={`${index}-${extraIndex}`} value={color}>
                        {color}
                      </option>
                    );
                  }
                  return null;
                });
              })}
            </select>
          </div>{" "}
          <div className="mt-4">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="washCard"
            >
              Wash Card{" "}
            </label>
            <input
              type="Textarea"
              id="washCard"
              name="washCard"
              value={washCard}
              onChange={(e) => setWashCard(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
              placeholder="Enter Additional Details"
            />
          </div>{" "}
          <div className="mt-4">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="embroidery"
            >
              Embroidery{" "}
            </label>
            <input
              type="Textarea"
              id="embroidery"
              name="embroidery"
              value={embroidery}
              onChange={(e) => setEmbroidery(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
              placeholder="Enter Additional Details"
            />
          </div>{" "}
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="zip">
              Zip{" "}
            </label>
            <input
              type="Textarea"
              id="zip"
              name="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
              placeholder="Enter Additional Details"
            />
          </div>{" "}
        </div>
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
