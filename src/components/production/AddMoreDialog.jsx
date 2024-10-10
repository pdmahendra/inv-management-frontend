import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function AddMoreDialog({ setData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    rollNo: "",
    grade: "",
    sort: "",
    noOfPieces: "",
    costPrice: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setData((prevData) => [...prevData, formData]); // Assuming setData accepts an array
    handleClose(); // Close dialog after submission
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
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            >
              <option value="">Select Roll Number</option>
              <option value="R01">R01</option>
              <option value="R02">R02</option>
              <option value="R03">R03</option>
              <option value="R04">R04</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="grade">
              Grade
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="sort">
              Sort
            </label>
            <input
              type="text"
              id="sort"
              name="sort"
              value={formData.sort}
              onChange={handleChange}
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
