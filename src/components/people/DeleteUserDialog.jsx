import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useDeleteUser } from "../../api/query/deleteUserApi";

function DeleteUser({ id }) {
  const { user } = useUser();
  const [adminPassword, setAdminPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteUser } = useDeleteUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    deleteUser(
      { delete_user_id: id, adminPassword },
      {
        onSuccess: (data) => {
          toast.success(data.message || "User deleted successfully");
          setIsLoading(false);
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.error || "Failed to delete user");
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div>
      {user?.userType === "admin" && (
        <div>
          <button
            onClick={handleClickOpen}
            className="px-4 py-2 text-white bg-gray-500 rounded"
          >
            Delete
          </button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
              Enter Admin Password
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-500 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default DeleteUser;
