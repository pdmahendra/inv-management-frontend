import React from "react";
import { useNavigate } from "react-router-dom";
function NotificationCard({ name, time, type, color, buttonHeading, link }) {
  const navigate = useNavigate();
  return (
    <div
      className={`p-4 w-full rounded-2xl border-[#9F9F9F] border-[1.5px] bg-[${color}] flex justify-between items-center`}
    >
      <div>{name}</div>
      <div>
        <button
          onClick={() => {
            navigate(`${link}`);
          }}
          className="px-4 py-2 rounded-xl bg-[#3F51D7] font-semibold text-white"
        >
          {buttonHeading}
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;
