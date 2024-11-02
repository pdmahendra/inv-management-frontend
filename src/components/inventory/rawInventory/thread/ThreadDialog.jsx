import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField"; // Import TextField component from MUI
import { useState } from "react";
import { useAddItem } from "../../../../api/query/inventory/invetoryApi";
import { toast } from "react-hot-toast";

export default function FormDialog({ refetch }) {
  const [open, setOpen] = useState(false);
  const { mutate: addItmes, isLoading } = useAddItem();
  const [data, setData] = useState({
    name: "N/A",
    quantity: 1,
    price: "",
    minimum: 1,
    image_url: "abc",
    inventory_type: "raw",
    sub_category: "thread",
    extra_fields: [{ color: "" }],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["color"].includes(name)) {
      setData((prevData) => ({
        ...prevData,
        extra_fields: {
          ...prevData.extra_fields,
          [name]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      min_limit: data.minimum,
      image_url: data.image_url,
      inventory_type: data.inventory_type,
      sub_category: data.sub_category,
      extra_fields: [{ color: data.extra_fields.color }],
    };

    try {
      addItmes(item, {
        onSuccess: () => {
          toast.success("Item added successfully!");

          setData({
            name: "N/A",
            quantity: 1,
            price: "",
            minimum: 1,
            image_url: "abc",
            inventory_type: "raw",
            sub_category: "thread",
            extra_fields: [{ color: "" }],
          });

          handleClose();
          refetch();
        },
        onError: (error) => {
          const errorMessage = error.response?.data?.error;
          toast.error(errorMessage);
        },
      });
    } catch (error) {
      console.error(error);
    }
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
            value={data.color}
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
            value={data.quantity}
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
            value={data.price}
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
