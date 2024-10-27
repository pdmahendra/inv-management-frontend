import React, { useState } from "react";
import icon from "../profileIcon.png";
import Factory from "../factory.png";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, handleSidebar, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    navigate("/login");
  };

  const handleTabClick = () => {
    if (window.innerWidth < 768) {
      handleSidebar(); // Close the sidebar only on smaller devices
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    navigate("/profile")
  }

  return (
    <div
      className={`fixed w-64 z-40  bg-[#F4F0ED] flex flex-col justify-between text-black h-full transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div>
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
          <Link to="/" className=" font-medium" onClick={handleTabClick}>
            <li class="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Home
            </li>
          </Link>
          <Link to="#" className="font-medium" onClick={handleTabClick}>
            <li class="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Analytics
            </li>
          </Link>
          <li>
            <div
              className="bg-[#F4F0ED] border-none shadow-none px-8 py-2 cursor-pointer flex justify-between"
              onClick={toggleAccordion}
            >
              <span className="font-medium">Inventory</span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={`size-4 delay-100 transition-transform ease-in-out duration-500 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>

            {/* Accordion Content */}
            <div
              className={`transition-all ease-in-out delay-100 duration-500 overflow-hidden ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul>
                <Link
                  to="/inventory/raw"
                  className="font-medium"
                  onClick={handleTabClick}
                >
                  <li className="rounded-full hover:bg-[#E4EAFB] px-10 py-2">
                    Raw Inventory
                  </li>
                </Link>
                <Link
                  to="/inventory/cutting"
                  className="font-medium"
                  onClick={handleTabClick}
                >
                  <li className="rounded-full hover:bg-[#E4EAFB] px-10 py-2">
                    Cutting Inventory
                  </li>
                </Link>
                <Link
                  to="/inventory/ready"
                  className="font-medium"
                  onClick={handleTabClick}
                >
                  <li className="rounded-full hover:bg-[#E4EAFB] px-10 py-2">
                    Ready Inventory
                  </li>
                </Link>
              </ul>
            </div>
          </li>

          <Link
            to="/production"
            className="font-medium"
            onClick={handleTabClick}
          >
            <li class="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Production{" "}
            </li>
          </Link>
          <Link
            to="/notifications"
            className="font-medium"
            onClick={handleTabClick}
          >
            <li class="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Notification
            </li>
          </Link>
          <Link to="/view-lifecycle" className="font-medium" onClick={handleTabClick}>
            <li class="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              View Lifecycle
            </li>
          </Link>
          <Link to="/issuance-records" className=" font-medium" onClick={handleTabClick}>
            <li class="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Issuance Records
            </li>
          </Link>
          {user?.userType !== "worker" && (
            <Link to="/people" className="font-medium" onClick={handleTabClick}>
              <li className="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
                People
              </li>
            </Link>
          )}

          <Link to="#" onClick={handleLogout} className="font-medium">
            <li className="px-8 p-2 rounded-full hover:bg-[#E4EAFB] hover:text-[#3F51D7]">
              Logout
            </li>
          </Link>
        </ul>
      </div>
      <div className="rounded-lg bg-blue-50 px-5 flex gap-4 items-center py-4">
        <img src={icon} className="w-10 h-10 cursor-pointer" onClick={handleProfileClick}/>
        <div className="text-black flex flex-col justify-center">
          <div className="font-semibold text-lg cursor-pointer" onClick={handleProfileClick}>{user?.name}</div>
          <div className="text-sm">{user?.userType}</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
