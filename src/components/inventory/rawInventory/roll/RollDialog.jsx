import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function FormDialog() {
  const [data, setData] = useState({
    rollNumber: "",
    sortNumber: "",
    meter: "",
    grade: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <button
        className="text-[1rem] rounded-lg bg-[#3F51D7] px-8 py-4 text-white font-bold whitespace-nowrap"
        onClick={handleClickOpen}
      >
        Add More
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
          Add item 
        </DialogTitle>{" "}
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="rollNumber"
            name="rollNumber"
            label="Roll Number"
            type="number"
            fullWidth
            variant="outlined"
            value={data.rollNumber}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="sortNumber"
            name="sortNumber"
            label="Sort Number"
            type="number"
            fullWidth
            variant="outlined"
            value={data.sortNumber}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="meter"
            name="meter"
            label="Meter"
            type="number"
            fullWidth
            variant="outlined"
            value={data.meter}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="grade"
            name="grade"
            label="Grade"
            type="text"
            fullWidth
            variant="outlined"
            value={data.grade}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="text-red-500 px-4 py-2 border-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            // onClick={handleSubmit}
            className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
