import React from "react";
import NotificationCard from "../components/NotificationCard";
function Notifications() {
  return (
    <div className="">
      <div className="p-6">
        <div className="max-sm:mt-2 text-[2rem] flex justify-between">
          <div className="max-sm:pl-12">Notifications</div>
        </div>
        <div className="mt-4">
          <NotificationCard
            name="Stock Limit Reached"
            color="#FFB5B5"
            buttonHeading={"Go to Inventory"}
            link={"/inventory"}
          />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
