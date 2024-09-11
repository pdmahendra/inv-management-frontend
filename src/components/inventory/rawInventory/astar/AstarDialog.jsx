import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useAddItem } from "../../../../api/query/inventory/invetoryApi";
import toast from "react-hot-toast";

export default function FormDialog({ refetch }) {

  const { mutate: addItmes, isLoading } = useAddItem();
  const [data, setData] = useState({
    name: "N/A",
    quantity: 1,
    price: "",
    minimum: 1,
    image_url: "abc",
    inventory_type: "raw",
    sub_category: "astar",
    extra_fields: [
      { item_name: "" },
      { color: "" },
      { meter: "" },
    ],
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      extra_fields: [
        { item_name: data.extra_fields.item_name },
        { color: data.extra_fields.color },
        { meter: data.extra_fields.meter },
      ],
    };

    try {
      addItmes(item, {
        onSuccess: (response) => {
          console.log(response);
          toast.success("item added successfully!");
          setData({
            name: "N/A",
            quantity: 1,
            price: "",
            minimum: 1,
            image_url: "ac",
            inventory_type: "raw",
            sub_category: "roll",
            extra_fields: {
              item_name: "",
              color: "",
              meter: "",
            },
          });
          refetch();
          handleClose();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["item_name", "color", "meter"].includes(name)) {
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

  return (
    <div>
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
            required
            margin="dense"
            id="item_name"
            name="item_name"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={data.extra_fields.item_name}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="color"
            name="color"
            label="Color"
            type="text"
            fullWidth
            variant="outlined"
            value={data.extra_fields.color}
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
            value={data.extra_fields.meter}
            onChange={handleInputChange}
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
