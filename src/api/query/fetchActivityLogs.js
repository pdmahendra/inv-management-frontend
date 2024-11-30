import axios from "../../utils/middleware";
import { API } from "../index";
import { useQuery } from "@tanstack/react-query";

const fetchAllActivityLogs = async () => {
  const response = await axios.get(API.activityLogs.getActivityLogs);
  return response.data.activityLogs;
};

export const useFetchAllActivityLogs = () => {
  return useQuery({
    queryKey: ["fetchAllActivityLogs"],
    queryFn: fetchAllActivityLogs,
  });
};
