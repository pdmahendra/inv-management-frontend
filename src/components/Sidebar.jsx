import React from "react";
import icon from "../profileIcon.png";
import Factory from "../factory.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, handleSidebar, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    toast.success("Logout successful!");

    navigate("/login");
  };
  return (
    <div
      className={`fixed w-64 z-40  bg-[#F4F0ED] flex flex-col justify-between text-black h-full transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div onClick={handleSidebar}>
        {" "}
        <div className="flex items-center justify-center py-4">
          <span className="text-xl font-semibold flex justify-start items-center">
            <img src={Factory} className="w-12 h-12 p-2" />
            Jeans Store
          </span>
          <button className="p-4 md:hidden" onClick={handleSidebar}>
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
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        </div>
        <ul class="mt-6">
          <Link to="/" className=" font-medium">
            <li class="px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Home
            </li>
          </Link>
          <Link to="#" className=" font-medium">
            <li class="mt-4 px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Analytics
            </li>
          </Link>
          <li>
            <Accordion
              sx={{
                backgroundColor: "#F4F0ED",
                border: "none",
                boxShadow: "none",
                paddingLeft: "16px",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <span className="font-medium">Inventory</span>
              </AccordionSummary>
              <AccordionDetails>
                <ul className="">
                  <Link to="/inventory/raw" className="font-medium">
                    <li className="hover:bg-[#E4EAFB] py-1">Raw Inventory</li>
                  </Link>
                  <Link to="/inventory/cutting" className="font-medium">
                    <li className="hover:bg-[#E4EAFB] py-1">
                      Cutting Inventory
                    </li>
                  </Link>
                  <Link to="/inventory/ready" className="font-medium">
                    <li className="hover:bg-[#E4EAFB] py-1">Ready Inventory</li>
                  </Link>
                </ul>
              </AccordionDetails>
            </Accordion>
          </li>
          <Link to="/production" className="font-medium">
            <li class="px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Production{" "}
            </li>
          </Link>
          <Link to="/notifications" className="font-medium">
            <li class="mt-4 px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Notification
            </li>
          </Link>
          <Link to="#" className="font-medium">
            <li class="mt-4 px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              View Lifecycle
            </li>
          </Link>
          <Link to="#" className=" font-medium">
            <li class="mt-4 px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Issuance Records
            </li>
          </Link>
          {user?.userType !== "worker" && (
            <Link to="/people" className="font-medium">
              <li className="mt-4 px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
                People
              </li>
            </Link>
          )}

          <Link to="#" onClick={handleLogout} className="font-medium">
            <li className="mt-4 px-8 rounded-lg hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Logout
            </li>
          </Link>
        </ul>
      </div>
      <div className="rounded-lg bg-blue-50 px-5 flex gap-4 items-center py-4">
        <img src={icon} className="w-10 h-10" />
        <div className="text-black flex flex-col justify-center">
          <div className="font-semibold text-lg">{user?.name}</div>
          <div className="text-sm">{user?.userType}</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
