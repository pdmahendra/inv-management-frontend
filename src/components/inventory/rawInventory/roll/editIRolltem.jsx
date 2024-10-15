import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteItem, useEditItem } from "../../../../api/query/inventory/invetoryApi";
import { useState } from "react";
import toast from "react-hot-toast";

function EditItem({ onEditClick, row }) {
  const { mutate: editItem } = useEditItem();
  const { mutate: deleteitems } = useDeleteItem();

  const [data, setData] = useState({
    roll_number: "",
    sort_number: "",
    meter: "",
    price: "",
    grade: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (row) {
      setData({
        roll_number: row.original?.extra_fields[0]?.roll_number,
        sort_number: row.original?.extra_fields[1]?.sort_number,
        meter: row.original?.extra_fields[2]?.meter,
        price: row.original?.price || "",
        grade: row.original?.extra_fields[3]?.grade,
      });
    }
  }, [row]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const itemId = row.original._id;

    const updatedData = {
      item_id: itemId,
      name: "N/A",
      quantity: 1,
      minimum: 1,
      image_url: "abc",
      inventory_type: "raw",
      sub_category: "roll",
      price: data.price,
      extra_fields: {
        roll_number: data.roll_number,
        sort_number: data.sort_number,
        meter: data.meter,
        grade: data.grade,
      },
    };

    editItem(updatedData, {
      onSuccess: (response) => {
        toast.success("Item updated successfully!");
        handleClose();
      },
      onError: (error) => {
        // const errorMessage = error.response?.data?.error || "Update failed";
        toast.error("Update failed");
      },
    });
  };

  const handleDelete = () => {
    const itemId = row.original._id;
    deleteitems(itemId, {
      onSuccess: () => {
        toast.success("Item deleted successfully!");
        handleClose();
      },
      onError: (error) => {
        // const errorMessage = error.response?.data?.error || "Delete failed";
        toast.error("Delete failed");
      },
    });
  };

  return (
    <>
      <button onClick={handleClickOpen}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 11.9999C20.7348 11.9999 20.4804 12.1053 20.2929 12.2928C20.1054 12.4804 20 12.7347 20 12.9999V18.9999C20 19.2652 19.8946 19.5195 19.7071 19.707C19.5196 19.8946 19.2652 19.9999 19 19.9999H5C4.73478 19.9999 4.48043 19.8946 4.29289 19.707C4.10536 19.5195 4 19.2652 4 18.9999V4.99994C4 4.73472 4.10536 4.48037 4.29289 4.29283C4.48043 4.1053 4.73478 3.99994 5 3.99994H11C11.2652 3.99994 11.5196 3.89458 11.7071 3.70705C11.8946 3.51951 12 3.26516 12 2.99994C12 2.73472 11.8946 2.48037 11.7071 2.29283C11.5196 2.1053 11.2652 1.99994 11 1.99994H5C4.20435 1.99994 3.44129 2.31601 2.87868 2.87862C2.31607 3.44123 2 4.20429 2 4.99994V18.9999C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 21.9999 5 21.9999H19C19.7956 21.9999 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 18.9999V12.9999C22 12.7347 21.8946 12.4804 21.7071 12.2928C21.5196 12.1053 21.2652 11.9999 21 11.9999ZM6 12.7599V16.9999C6 17.2652 6.10536 17.5195 6.29289 17.707C6.48043 17.8946 6.73478 17.9999 7 17.9999H11.24C11.3716 18.0007 11.5021 17.9755 11.6239 17.9257C11.7457 17.8759 11.8566 17.8026 11.95 17.7099L18.87 10.7799L21.71 7.99994C21.8037 7.90698 21.8781 7.79637 21.9289 7.67452C21.9797 7.55266 22.0058 7.42195 22.0058 7.28994C22.0058 7.15793 21.9797 7.02722 21.9289 6.90536C21.8781 6.7835 21.8037 6.6729 21.71 6.57994L17.47 2.28994C17.377 2.19621 17.2664 2.12182 17.1446 2.07105C17.0227 2.02028 16.892 1.99414 16.76 1.99414C16.628 1.99414 16.4973 2.02028 16.3754 2.07105C16.2536 2.12182 16.143 2.19621 16.05 2.28994L13.23 5.11994L6.29 12.0499C6.19732 12.1434 6.12399 12.2542 6.07423 12.376C6.02446 12.4979 5.99924 12.6283 6 12.7599ZM16.76 4.40994L19.59 7.23994L18.17 8.65994L15.34 5.82994L16.76 4.40994ZM8 13.1699L13.93 7.23994L16.76 10.0699L10.83 15.9999H8V13.1699Z"
            fill="#5F6067"
          />
        </svg>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
          Edit item
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="roll_number"
            value={data.roll_number}
            onChange={handleInputChange}
            label="Roll Number"
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <TextField
            name="sort_number"
            value={data.sort_number}
            onChange={handleInputChange}
            label="Sort Number"
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <TextField
            name="meter"
            value={data.meter}
            onChange={handleInputChange}
            label="Meter"
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <TextField
            name="price"
            value={data.price}
            onChange={handleInputChange}
            label="Price"
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <TextField
            name="grade"
            value={data.grade}
            onChange={handleInputChange}
            label="Grade"
            fullWidth
            variant="outlined"
            margin="dense"
          />
        </DialogContent>
        <DialogActions sx={{ padding: "1rem 1.5rem" }}>
          <button
            className="text-red-500 px-4 py-2 border-2 rounded-xl"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
            onClick={handleEdit}
          >
            Update
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditItem;
