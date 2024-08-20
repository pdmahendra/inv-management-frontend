import React from "react";
import axios from "../../utils/middleware";
import { API } from "../../api/index";
import toast from "react-hot-toast";

const ListItem = ({ id, title, description, status, getTasks }) => {
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

  return (
    <div className="border border-gray-200 mt-4 rounded-xl p-1 w-80 bg-white">
      <li className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
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
          <span>{title}</span>
        </div>
      </li>
    </div>
  );
};

export default ListItem;
