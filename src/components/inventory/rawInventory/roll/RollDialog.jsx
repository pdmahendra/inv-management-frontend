import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useAddItem } from "../../../../api/query/inventory/invetoryApi";
import toast from "react-hot-toast";
import QRCodeScanner from "../../rawInventory/roll/Scanner";

export default function FormDialog({ refetch, sortNumber, duplicate }) {
  const { mutate: addItmes, isLoading } = useAddItem();
  const [data, setData] = useState({
    name: "N/A",
    quantity: 1,
    price: 1,
    minimum: 1,
    image_url: "abc",
    inventory_type: "raw",
    sub_category: "roll",
    extra_fields: [
      { roll_number: "" },
      { sort_number: "" },
      { meter: "" },
      { grade: "" },
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
        { roll_number: data.extra_fields.roll_number },
        { sort_number: data.extra_fields.sort_number },
        { meter: data.extra_fields.meter },
        { grade: data.extra_fields.grade },
      ],
    };

    try {
      addItmes(item, {
        onSuccess: (response) => {
          console.log(response);
          toast.success("item added successfully!");
          refetch();
          setData({
            name: "N/A",
            quantity: 1,
            price: 1,
            minimum: 1,
            image_url: "ac",
            inventory_type: "raw",
            sub_category: "roll",
            extra_fields: {
              roll_number: "",
              sort_number: "",
              meter: "",
              grade: "",
            },
          });
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
    if (["roll_number", "sort_number", "meter", "grade"].includes(name)) {
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
  React.useEffect(() => {
    if (sortNumber) {
      data.extra_fields.sort_number = sortNumber;
    }
    if (duplicate) {
      console.log(duplicate);
      // data.extra_fields.roll_number;
      data.extra_fields.sort_number =
        duplicate.original?.extra_fields[1]?.sort_number;
      data.extra_fields.grade = duplicate.original?.extra_fields[3]?.grade;
      data.price = duplicate.original.price;
      // data.extra_fields.meter;
      // data.extra_fields.grade;
      // row.original?.price || "",
    }
  }, []);
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
            Add item
          </DialogTitle>{" "}
          <div className="mr-8">
            <QRCodeScanner setData={setData} />
          </div>
        </div>
        <DialogContent>
          <p>Roll Number</p>
          <TextField
            required
            margin="dense"
            id="roll_number"
            name="roll_number"
            
            type="text"
            fullWidth
            variant="outlined"
            value={data.extra_fields.roll_number}
            onChange={handleInputChange}
          />
          <p>Sort Number</p>
          <TextField
            required
            margin="dense"
            id="sort_number"
            name="sort_number"
            
            type="text"
            fullWidth
            variant="outlined"
            value={data.extra_fields.sort_number}
            disabled={sortNumber}
            onChange={handleInputChange}
          />
          <p>Meter</p>
          <TextField
            required
            margin="dense"
            id="meter"
            name="meter"
            
            type="number"
            fullWidth
            variant="outlined"
            value={data.extra_fields.meter}
            onChange={handleInputChange}
          />
          <p>Price</p>
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            
            type="number"
            fullWidth
            variant="outlined"
            value={data.price}
            onChange={handleInputChange}
          />
<p>Grade</p>
          <TextField
            required
            margin="dense"
            id="grade"
            name="grade"
            
            type="text"
            fullWidth
            variant="outlined"
            value={data.extra_fields.grade}
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
