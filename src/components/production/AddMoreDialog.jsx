import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useFetchInventoryData } from "../../api/query/inventory/invetoryApi";
import { useFetchItemData } from "../../api/query/inventory/invetoryApi";
import { toast } from "react-hot-toast";

export default function AddMoreDialog({ setData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    rollNo: "",
    grade: "",
    sort: "",
    noOfPieces: "",
    costPrice: "",
  });
  const [selectedSortNumber, setSelectedSortNumber] = useState("");
  const [selectedRollNoId, setSelectedRollNoId] = useState("");

  // Fetch inventory data
  const { data: inventoryData = { items: [] }, isLoading: isFetching } =
    useFetchInventoryData();
  const filteredInventoryData = inventoryData.items?.filter(
    (item) => item.inventory_type === "raw" && item.sub_category === "roll"
  );

  // Extract unique sort numbers
  const sortNumbers = [
    ...new Set(
      filteredInventoryData.flatMap((item) =>
        item.extra_fields
          .filter((field) => field.sort_number)
          .map((field) => field.sort_number)
      )
    ),
  ];

  // Filter roll numbers based on selected sort number
  const rollNumbers = filteredInventoryData
    .filter((item) =>
      item.extra_fields.some(
        (field) => field.sort_number === selectedSortNumber
      )
    )
    .map((item) => {
      const rollField = item.extra_fields.find((field) => field.roll_number);
      if (rollField?.roll_number) {
        return { roll_number: rollField.roll_number, id: item._id };
      }
      return null;
    })
    .filter(Boolean);

  // Fetch roll item data by ID
  const { data: rollInventoryData } = useFetchItemData(selectedRollNoId);

  // Prefill form fields when roll data changes
  useEffect(() => {
    if (rollInventoryData?.items) {
      const { extra_fields, price } = rollInventoryData.items;
      const sort =
        extra_fields.find((field) => field.sort_number)?.sort_number || "";
      const meter = extra_fields.find((field) => field.meter)?.meter || "";
      const grade = extra_fields.find((field) => field.grade)?.grade || "";

      setFormData((prevData) => ({
        ...prevData,
        sort,
        meter,
        price,
        grade,
      }));
    }
  }, [rollInventoryData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSortChange = (e) => {
    setSelectedSortNumber(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      rollNo: "",
      sort: e.target.value,
    }));
    setSelectedRollNoId("");
  };

  const handleRollChange = (e) => {
    const { value } = e.target;
    const selectedRollNo = rollNumbers.find(
      (rollNo) => rollNo.roll_number === value
    );

    setFormData((prevData) => ({
      ...prevData,
      rollNo: value,
    }));

    setSelectedRollNoId(selectedRollNo?.id || "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.rollNo) {
      toast.error("Please select Roll number to continue.");
      return;
    }
    if (!formData.noOfPieces || !formData.costPrice) {
      toast.error("Please enter number of pieces and cost price.");
      return;
    }

    setData((prevData) => [...prevData, formData]);

    setFormData({
      rollNo: "",
      grade: "",
      sort: "",
      noOfPieces: "",
      costPrice: "",
    });

    handleClose();
  };
  return (
    <div>
      <button
        className="text-[1rem] rounded-lg bg-[#3F51D7] px-6 py-3 text-white font-bold whitespace-nowrap"
        onClick={handleClickOpen}
      >
        Add More
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "600px",
              maxWidth: "80%",
              padding: "20px",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
          Add Roll
        </DialogTitle>
        <DialogContent>
          <div>
            <label htmlFor="sortNo">Select Sort Number</label>
            <select
              id="sortNo"
              value={selectedSortNumber}
              onChange={handleSortChange}
              className="w-full px-4 py-4 border rounded-lg"
            >
              <option value="" disabled>
                Select Sort Number
              </option>
              {sortNumbers.map((sort, index) => (
                <option key={index} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-8">
            <label className="block mb-2 text-lg font-medium" htmlFor="rollNo">
              Select Roll Number
            </label>
            <select
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleRollChange}
              className="w-full px-4 py-4 border rounded-lg"
            >
              <option value="" disabled>
                Select Roll Number
              </option>
              {rollNumbers.map((roll, index) => (
                <option key={index} value={roll.roll_number}>
                  {roll.roll_number}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="sort">
              Sort
            </label>
            <input
              type="text"
              id="sort"
              name="sort"
              readOnly
              value={formData.sort}
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div> */}
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="meter">
              Meter
            </label>
            <input
              type="text"
              id="meter"
              name="meter"
              readOnly
              value={formData.meter}
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              readOnly
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="grade">
              Grade
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              readOnly
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="noOfPieces"
            >
              Expected Number of Pieces
            </label>
            <input
              type="number"
              id="noOfPieces"
              name="noOfPieces"
              value={formData.noOfPieces}
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="costPrice"
            >
              Cost Price
            </label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="text-red-500 px-4 py-2 border-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
