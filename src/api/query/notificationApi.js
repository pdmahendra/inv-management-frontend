import axios from "../../utils/middleware";
import { API } from "../index";
import { useQuery } from "@tanstack/react-query";

export const getNotifications = async () => {
  const response = await axios.get(`${API.notification.getNotifications}`);
  return response?.data?.notifications;
};

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotifications,
  });
};
