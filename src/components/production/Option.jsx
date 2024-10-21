import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { downloadPdf } from "../../api/query/downloadChallan";
import MarkAsCompletedDialog from "../production/MarkAsCompletedDialog";

export default function Options({ id, markAsDone, row, heading }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadClick = async () => {
    const toastId = toast.loading("Downloading..");
    try {
      await downloadPdf(id);
      toast.dismiss(toastId);
      toast.success("Download successful!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Download failed!");
    }
  };

  return (
    <div>
      <button id="demo-positioned-button" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 20,
          horizontal: 10,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#fffeff",
          },
        }}
      >
        {/* <MenuItem onClick={handleMarkAsCompleted}>Mark as Completed</MenuItem> */}
        {heading != "Completed" ? (
          <MenuItem>
            <MarkAsCompletedDialog row={row} id={id} markAsDone={markAsDone} />
          </MenuItem>
        ) : (
          <div></div>
        )}

        <MenuItem onClick={handleDownloadClick}>Generate Challan</MenuItem>
      </Menu>
    </div>
  );
}
