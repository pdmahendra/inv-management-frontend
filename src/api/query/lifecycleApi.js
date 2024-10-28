import axios from "../../utils/middleware";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { API } from "../index";

export const fetchAllLifecycle = async () => {
  const response = await axios.get(`${API.lifecycle.getAllLifecycle}`);
  return response.data;
};

export const useFetchAllLifecycle = () => {
  return useQuery({
    queryKey: ["fetchAllLifecycle"],
    queryFn: fetchAllLifecycle,
  });
};

export const fetchMyLifecycle = async () => {
  const response = await axios.get(`${API.lifecycle.getMyLifecycle}`);
  return response.data;
};

export const useFetchMyLifecycle = () => {
  return useQuery({
    queryKey: ["fetchMyLifecycle"],
    queryFn: fetchMyLifecycle,
  });
};

export const startNewLifecycle = async (lifecycleData) => {
  console.log(lifecycleData);
  const response = await axios.post(
    `${API.lifecycle.startNewLifecycle}`,
    lifecycleData
  );
  return response.data;
};

export const useStartNewLifecycle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: startNewLifecycle,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllLifecycle","fetchMyLifecycle"]);
    },
    onError: (error) => {
      console.error("Error starting lifecycle:", error);
    },
  });
};
