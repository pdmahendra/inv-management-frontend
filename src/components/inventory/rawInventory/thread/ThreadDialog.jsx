import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField"; // Import TextField component from MUI
import { useState } from "react";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    color: "",
    number: "",
    quantity: "",
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <button
        className="text-[1rem] rounded-lg bg-[#3F51D7] px-8 py-4 text-white font-bold whitespace-nowrap"
        onClick={handleClickOpen}
      >
        Add More
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="flex justify-between items-center">
          <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
            Add Item
          </DialogTitle>
        </div>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="color"
            name="color"
            label="Color"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.color}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="number"
            name="number"
            label="Number"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.number}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.quantity}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="text-red-500 px-4 py-2 border-2 rounded-xl"
          >
            Cancel
          </button>
          <button className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl">
            Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
