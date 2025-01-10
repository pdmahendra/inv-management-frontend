import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PeopleTable from "../components/people/PeopleTable";
import { useRegister } from "../api/query/registerUser";
import { useUser } from "../context/UserContext";
import { useFetchAllUsers } from "../api/query/fetchAllUsers";
import toast from "react-hot-toast";

function People() {
  const userTypes = {
    SuperAdmin: "SuperAdmin",
    SuperManager: "SuperManager",
    CuttingManager: "CuttingManager",
    LifecycleManager: "LifecycleManager",
    InventoryManager: "InventoryManager",
    Worker: "worker",
  };
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [userType, setUserType] = useState("SuperAdmin");
  const [open, setOpen] = React.useState(false);

  const { user } = useUser();
  const { mutate: register, isLoading } = useRegister();
  const {
    data: peopleData = [],
    isLoading: isFetching,
    refetch,
  } = useFetchAllUsers();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const data = {
        name,
        username,
        password,
        phoneNo,
        userType,
      };
      register(data, {
        onSuccess: (response) => {
          console.log(response);
          toast.success("Registration successful!");
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adminCount =
    peopleData?.users?.filter((user) => user.userType === "admin").length || 0;
  const managerCount =
    peopleData?.users?.filter((user) => user.userType === "manager").length ||
    0;
  const workerCount =
    peopleData?.users?.filter((user) => user.userType === "worker").length || 0;

  return (
    <div className="p-6">
      <div className="max-md:mt-2 text-[2rem] flex justify-between">
        <div className="max-sm:pl-12">People</div>
      </div>
      <div className="flex gap-8 sm:gap-0 flex-col lg:flex-row justify-between w-[380px] sm:w-full ">
        <div className="w-full sm:pt-8 sm:pr-16">
          {user?.userType === "admin" && (
            <div className="flex justify-end mb-6">
              <button
                onClick={handleClickOpen}
                className="text-[1rem] rounded-lg bg-[#3F51D7] px-8 py-4 text-white font-bold whitespace-nowrap"
              >
                Add More
              </button>
              <Dialog open={open} onClose={handleClose}>
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
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setPhoneNo(e.target.value)}
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
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />{" "}
                  <div className="dropdown relative w-full mt-4">
                    Role Type
                    <select
                      id="userType"
                      name="userType"
                      className="w-full px-3 mt-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-600"
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      {Object.values(userTypes).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
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
                    onClick={handleSubmit}
                    className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
                  >
                    Add
                  </button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          <PeopleTable data={peopleData?.users || []} refetch={refetch} />{" "}
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-8 lg:mt-8 sm:w-[15rem]">
          <div className="py-10 px-16 bg-[#F1FFCB] rounded-[8px] flex flex-row sm:flex-col justify-around gap-[20px] items-center">
            <div className="text-[1.5rem] sm:text-[1.2rem]">Admin</div>
            <div className="text-[1.8em] font-semibold">{adminCount}</div>
          </div>{" "}
          <div className="py-10 px-16 bg-[#A6CCFF] rounded-[8px] flex flex-row sm:flex-col justify-around gap-[20px] items-center">
            <div className="text-[1.5rem] sm:text-[1.2rem]">Managers</div>
            <div className="text-[1.8em] font-semibold">{managerCount}</div>
          </div>{" "}
          <div className="py-10 px-16 bg-[#FFB5B5] rounded-[8px] flex flex-row sm:flex-col justify-around gap-[20px] items-center">
            <div className="text-[1.5rem] sm:text-[1.2rem]">Workers</div>
            <div className="text-[1.8em] font-semibold">{workerCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default People;
