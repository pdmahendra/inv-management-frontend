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
      queryClient.invalidateQueries(["fetchAllProduction"]); // fz etch ongoing table query here
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};
