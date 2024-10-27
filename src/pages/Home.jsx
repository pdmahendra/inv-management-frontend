import React from "react";
import icon from "../profileIcon.png";
import Agendas from "../components/home/Agendas";
import Alarms from "../components/home/Alarms";
import Todays from "../components/home/Todays";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <div className="">
      <div className="py-4 border-b flex justify-between">
        <div className="text-[2rem] max-md:mt-4 max-md:ml-16">Home</div>
        <div className="rounded-lg px-2 flex gap-4 items-center py-5 md:py-1">
          <img
            src={icon}
            className="w-10 h-10 cursor-pointer"
            onClick={handleProfileClick}
          />
          <div className="text-black flex flex-col justify-center">
            <div
              className=" flex gap-2 font-semibold text-lg cursor-pointer"
              onClick={handleProfileClick}
            >
              {user?.name}{" "}
              <span className="place-self-center mt-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            <div className="text-sm">{user?.userType}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap max-md:justify-center max-md:items-center gap-24 mt-4">
        <Agendas />
        <Alarms />
        <Todays />
      </div>
    </div>
  );
}

export default Home;
