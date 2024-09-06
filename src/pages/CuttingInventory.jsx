import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RawInventoryTable from "../components/inventory/rawInventory/accessories/RawInventoryAccessoriesTable";
import { useAddItem } from "../api/query/inventory/invetoryApi";
import { useFetchInventoryData } from "../api/query/inventory/invetoryApi";
import toast from "react-hot-toast";

export default function RawInventory() {
  const { mutate: addItmes, isLoading } = useAddItem();
  const {
    data: inventoryData = { items: [] },
    isLoading: isFetching,
    refetch,
  } = useFetchInventoryData();
  const [data, setData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    minimum: 0,
    image_url: "",
    inventory_type: "",
  });

  const filteredInventoryData = inventoryData.items?.filter(
    (item) => item.inventory_type === "cutting"
  );

  const [open, setOpen] = React.useState(false);

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
      min_limit: data.min_limit,
      image_url: "abc",
      inventory_type: "cutting",
    };

    try {
      addItmes(item, {
        onSuccess: (response) => {
          console.log(response);
          toast.success("item added successfully!");
          setData({
            name: "",
            quantity: "",
            price: "",
            min_limit: "",
            image_url: "",
            inventory_type: "",
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
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <div className="md:ml-60 p-6">
        <div className="ml-12 max-md:mt-2 text-[2rem] flex justify-between">
          <div>Cutting Inventory</div>
        </div>
        <div className="flex justify-between w-[380px] sm:w-full">
          <div className=" max-sm:mt-8 w-full sm:p-8">
            <div className="flex justify-end mb-6">
              <button
                className="text-[1rem] rounded-lg bg-[#3F51D7] px-8 py-4 text-white font-bold whitespace-nowrap"
                onClick={handleClickOpen}
              >
                Add More
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                // PaperProps={{
                //   component: "form",
                //   onSubmit: (event) => {
                //     event.preventDefault();
                //     const formData = new FormData(event.currentTarget);
                //     const formJson = Object.fromEntries(formData.entries());
                //     const email = formJson.email;
                //     console.log(email);
                //     handleClose();
                //   },
                // }}
              >
                <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
                  Add item
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Item Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="qty"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={data.quantity}
                    onChange={handleInputChange}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="qty"
                    name="min_limit"
                    label="Minimum Limit"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={data.min_limit}
                    onChange={handleInputChange}
                  />
                  <TextField
                    autoFocus
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
            <RawInventoryTable data={filteredInventoryData} refetch={refetch} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
