import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PeopleTable from '../components/people/PeopleTable'
function People() {
  const [userType, setUserType] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("adway");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const peopleData = [
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      phone: "1234567890",
      username: "Adway7103",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Admin",
      phone: "1234567890",
      username: "Adway7103",
    },
    {
      id: 3,
      name: "John Doe",
      role: "Admin",
      phone: "1234567890",
      username: "Adway7103",
    },
    {
      id: 4,
      name: "John Doe",
      role: "Admin",
      phone: "1234567890",
      username: "Adway7103",
    },
  ];
  return (
      <div className="md:ml-60 p-6">
        <div className="ml-12 max-md:mt-2 text-[2rem] flex justify-between">
          <div>People</div>
        </div>
        <div className="flex gap-8 sm:gap-0 flex-col lg:flex-row justify-between w-[380px] sm:w-full ">
          <div className="w-full sm:p-8">
            <div className="flex justify-end mb-6">
              <button
                onClick={handleClickOpen}
                className="text-[1rem] rounded-lg bg-[#3F51D7] px-8 py-4 text-white font-bold whitespace-nowrap"
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
                  Add new people
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="Name"
                    label="Name"
                    type="number"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    type="number"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="Username"
                    name="Username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="Admin"
                    name="AdminPass"
                    label="Admin Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="NewPass"
                    name="NewPass"
                    label="Set a Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                  />{" "}
                  <div className="dropdown relative w-full mt-4">
                    Role Type
                    <select
                      id="userType"
                      name="userType"
                      className="w-full px-3 mt-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-600"
                      onChange={(e) => {
                        setUserType(e.target.value);
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="worker">Worker</option>
                    </select>
                  </div>
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
            <PeopleTable data={peopleData} />{" "}
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col sm:justify-around gap-8 lg:mt-8 sm:w-[15rem]">
            <div className="py-10 px-16 bg-[#F1FFCB] rounded-[8px] flex flex-row sm:flex-col justify-around gap-[20px] items-center">
              <div className="text-[1.5rem] sm:text-[1.2rem]">Admin</div>
              <div className="text-[1.8em] font-semibold">14</div>
            </div>{" "}
            <div className="py-10 px-16 bg-[#A6CCFF] rounded-[8px] flex flex-row sm:flex-col justify-around gap-[20px] items-center">
              <div className="text-[1.5rem] sm:text-[1.2rem]">Managers</div>
              <div className="text-[1.8em] font-semibold">14</div>
            </div>{" "}
            <div className="py-10 px-16 bg-[#FFB5B5] rounded-[8px] flex flex-row sm:flex-col justify-around gap-[20px] items-center">
              <div className="text-[1.5rem] sm:text-[1.2rem]">Workers</div>
              <div className="text-[1.8em] font-semibold">14</div>
            </div>
          </div>
        </div>
      </div>
  );
}
export default People;
