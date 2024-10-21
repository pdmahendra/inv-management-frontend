import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RawInventoryTable from "../components/inventory/rawInventory/accessories/RawInventoryAccessoriesTable";
import { useAddItem } from "../api/query/inventory/invetoryApi";
import toast from "react-hot-toast";
import { useFetchAllProduction } from "../api/query/productionApi";
import OngoingCompletedTable from "../components/production/OngoingCompletedTable";

export default function CuttingInventory() {
  const { data: productionResponse, isLoading: isFetching } =
    useFetchAllProduction();

  const productionData = productionResponse?.productions || [];
  const completedProduction = productionData.filter(
    (item) => item.markAsDone === true
  );

  const [open, setOpen] = React.useState(false);

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
    <div className="">
      <div className="p-6">
        <div className="max-md:mt-2 text-[2rem] flex justify-between">
          <div className="max-sm:pl-12">Cutting Inventory</div>
        </div>
        <div className="flex justify-between w-[380px] sm:w-full">
          <div className=" max-sm:mt-8 w-full sm:pt-8 sm:pr-16">
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
            <OngoingCompletedTable
              data={completedProduction}
              heading={"Completed"}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
