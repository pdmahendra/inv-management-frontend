import axios from "../../utils/middleware";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { API } from "../index";

export const fetchAllProduction = async () => {
  const response = await axios.get(`${API.production.getAllProduction}`);
  return response.data;
};

export const useFetchAllProduction = () => {
  return useQuery({
    queryKey: ["fetchAllProduction"],
    queryFn: fetchAllProduction,
  });
};

export const fetchMyProduction = async () => {
  const response = await axios.get(`${API.production.getMyProductions}`);
  return response.data;
};

export const useFetchMyProduction = () => {
  return useQuery({
    queryKey: ["fetchMyProduction"],
    queryFn: fetchMyProduction,
  });
};

export const startNewProduction = async (productionData) => {
  const response = await axios.post(
    `${API.production.startNew}`,
    productionData
  );
  return response.data;
};

export const useStartNewProduction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: startNewProduction,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllProduction"]);
    },
    onError: (error) => {
      console.error("Error starting production:", error);
    },
  });
};

export const updateProduction = async ({ id, updatedMarkAsDone }) => {
  const response = await axios.put(`${API.production.update}/${id}`, {
    markAsDone: updatedMarkAsDone,
  });
  return response.data;
};

export const useUpdateProduction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduction,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllProduction"]);
    },
    onError: (error) => {
      console.error("Error updating production:", error);
    },
  });
};
