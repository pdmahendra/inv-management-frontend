import React from "react";
import NotificationCard from "../components/NotificationCard";
import { useGetNotifications } from "../api/query/notificationApi";
function Notifications() {
  const { data } = useGetNotifications();

  console.log(data);

  return (
    <div className="">
      <div className="p-6">
        <div className="max-sm:mt-2 text-3xl flex justify-between ">
          <div className="max-sm:pl-12">Notifications</div>
        </div>
        <div className="mt-4 space-y-4">
          {data &&
            data.map((n) => {
              console.log("Notification ID:", n.id);
              return (
                <NotificationCard
                  message={n.message}
                  id={n.id}
                  type={n.type}
                  color="#FFB5B5"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
