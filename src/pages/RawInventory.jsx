import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RawInventoryTable from '../components/inventory/rawInventory/RawInventoryTable'
export default function RawInventory() {
  const peopleData = [
    {
      id: 1,
      name: "Button",
      quantity: "8",
      minimum: "4",
      status: "green",
    },
    {
      id: 2,
      name: "Cloth",
      role: "Admin",
      phone: "1234567890",
      username: "Adway7103",
    },
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <div className="md:ml-60 p-6">
        <div className="ml-12 max-md:mt-2 text-[2rem] flex justify-between">
          <div>Raw Inventory</div>
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
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                  },
                }}
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
                    name="Item Name"
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
                    name="Initial Quantity"
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
                    name="Minimum Limit"
                    label="Minimum Limit"
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
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
                  >
                    Add
                  </button>
                </DialogActions>
              </Dialog>
            </div>
            <RawInventoryTable data={peopleData} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
