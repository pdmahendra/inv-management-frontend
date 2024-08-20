import axios from "../../utils/middleware";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../index";

export const registerUser = async (data) => {
  const response = await axios.post(`${API.users.register}`, data);
  return response.data;
};
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllUsers"]);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};
