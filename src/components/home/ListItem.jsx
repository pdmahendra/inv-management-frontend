import React from "react";
import { downloadPdf } from "../../api/query/downloadChallan";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { API } from "../../api";
const ListItem = ({
  id,
  title,
  description,
  status,
  getTasks,
  daysLeft,
  heading,
}) => {
  const svgColor = status ? "green" : "red";

  const handleClick = async () => {
    try {
      await axios.put(`${API.tasks.updateStatus}`, { task_id: id });
      console.log(id);
      toast.success("Task completed successfully!");
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update:");
    }
  };

  const handleDelete = async () => {
    const task_id = id;
    try {
      await axios.delete(`${API.tasks.deleteTask}`, { data: { task_id } });
      console.log(id);
      toast.success("Task Deleted successfully!");
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete:");
    }
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
    <div className="border border-gray-200 mt-4 rounded-xl p-1 w-80 bg-white">
      <li className="py-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {" "}
            {heading ? (
              <div></div>
            ) : (
              <div className="pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={svgColor}
                  className="size-5 hover:cursor-pointer"
                  onClick={handleClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            )}
            {heading ? (
              <Tooltip title="Click to Generate Challan">
                <span
                  className="text-sm cursor-pointer"
                  onClick={handleDownloadClick}
                >
                  {title}
                </span>
              </Tooltip>
            ) : (
              <span className="text-sm">{title}</span>
            )}
          </div>
          {heading ? (
            <span className="text-xs text-red-500 pr-2">{daysLeft}</span>
          ) : (
            <div onClick={handleDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default ListItem;
