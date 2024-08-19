import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = () => {
    console.log();
    
    setSidebarOpen((prev) => !prev);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) { 
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />

      <div className="flex-1">
        <div className={`md:hidden pl-6 fixed top-10 ${sidebarOpen ? "hidden" : "block"}`}>
          <button onClick={handleSidebar} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        </div>

        <main className="min-w-[300px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
