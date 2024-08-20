import axios from "../../utils/middleware";
import { API } from "../index";
import { useQuery } from "@tanstack/react-query";

export const fetchAllUsers = async () => {
  const response = await axios.get(`${API.users.fetchAllUsers}`);
  return response.data;
};

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ["fetchAllUsers"],
    queryFn: fetchAllUsers,
  });
};
