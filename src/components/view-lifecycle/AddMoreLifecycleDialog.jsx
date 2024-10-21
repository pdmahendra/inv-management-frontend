import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useFetchAllProduction,
  useFetchProductionById,
} from "../../api/query/productionApi";

export default function AddMoreLifecycleDialog({ setData, data }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    rollNo: "",
    grade: "",
    sort: "",
    meter: "",
    price: "",
    noOfPieces: "",
    costPrice: "",
  });
  const [selectedProductionId, setSelectedProductionId] = useState("");

  // Fetch all production data
  const { data: productionResponse, isLoading: isFetching } =
    useFetchAllProduction();

  const productionData = productionResponse?.productions || [];

  // Filter out completed production rolls
  const completedProduction = productionData.filter(
    (item) => item.markAsDone === true
  );
  const completedRolls = completedProduction.flatMap((item) =>
    item.rolls.map((roll) => ({
      rollNo: roll.rollNo,
      productionId: item._id,
    }))
  );

  // Filter rolls to exclude already added roll numbers (using `data` prop)
  const availableRolls = completedRolls.filter(
    (roll) => !data.some((addedRoll) => addedRoll.rollNo === roll.rollNo)
  );

  const handleRollNoChange = (e) => {
    const selectedRollNo = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      rollNo: selectedRollNo,
    }));

    const selectedRoll = availableRolls?.find(
      (roll) => roll?.rollNo === selectedRollNo
    );

    if (selectedRoll) {
      setSelectedProductionId(selectedRoll.productionId);
    } else {
      setSelectedProductionId("");
    }
  };

  // Fetch roll item data by selected production ID
  const { data: rollProductionData } =
    useFetchProductionById(selectedProductionId);

  // Prefill fields based on the fetched production data
  useEffect(() => {
    if (rollProductionData && formData.rollNo) {
      const roll = rollProductionData.production.rolls.find(
        (r) => r.rollNo === formData.rollNo
      );

      if (roll) {
        setFormData((prevData) => ({
          ...prevData,
          grade: roll.grade,
          sort: roll.sort,
          meter: roll.meter,
          price: roll.price,
          noOfPieces: roll.noOfPieces,
          costPrice: roll.costPrice.toString(),
        }));
      }
    }
  }, [rollProductionData, formData.rollNo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.rollNo) {
      toast.error("Please select Roll number to continue.");
      return;
    }

    setData((prevData) => [...prevData, formData]);

    // Reset the form data after submission
    setFormData({
      rollNo: "",
      grade: "",
      sort: "",
      meter: "",
      price: "",
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
          <div className="mt-8">
            <label className="block mb-2 text-lg font-medium" htmlFor="rollNo">
              Select Roll Number
            </label>
            <select
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleRollNoChange}
              className="w-full px-4 py-4 border rounded-lg"
            >
              <option value="" disabled>
                Select Roll Number
              </option>

              {availableRolls?.map((roll, index) => (
                <option key={index} value={roll.rollNo}>
                  {roll.rollNo}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="sort">
              Sort
            </label>
            <input
              type="text"
              id="sort"
              name="sort"
              readOnly
              value={formData.sort}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
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
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="noOfPieces"
            >
              Number of Pieces
            </label>
            <input
              type="number"
              id="noOfPieces"
              name="noOfPieces"
              value={formData.noOfPieces}
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
            className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
            onClick={handleSubmit}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
