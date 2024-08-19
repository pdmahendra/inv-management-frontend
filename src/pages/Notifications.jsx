import React from "react";
import NotificationCard from "../components/NotificationCard";
function Notifications() {
  return (
    <div className="">
      <div className="md:ml-60 p-6">
        <div className="ml-12 max-sm:mt-2 text-[2rem] flex justify-between">
          <div>Notifications</div>
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
