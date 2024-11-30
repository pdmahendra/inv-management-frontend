import React from "react";
import { useNavigate } from "react-router-dom";
function NotificationCard({ message, id, type, color }) {
  const navigate = useNavigate();
  return (
    <div
      className={`p-4 w-full rounded-2xl border-[#9F9F9F] border-[1.5px] bg-[${color}] flex justify-between items-center`}
    >
      <div className="text-xs md:text-sm">{message}</div>
      {type && type === "lifecycle" && (
        <div>
          <button
            onClick={() => {
              navigate(`/view-lifecycle/details/${id}`);
            }}
            className="text-[10px] md:text-sm px-2 md:px-4 py-1 sm:py-2 rounded-xl bg-[#3F51D7] font-semibold text-white"
          >
            Go to view details{" "}
          </button>
        </div>
      )}
      {type && type === "production" && (
        <div>
          <button
            onClick={() => {
              navigate(`/production`);
            }}
            className="text-[10px] md:text-sm px-2 md:px-4 py-1 sm:py-2 rounded-xl bg-[#3F51D7] font-semibold text-white"
          >
            Go to production{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationCard;
