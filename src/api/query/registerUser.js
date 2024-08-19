import axios from "../../utils/middleware";
import { useMutation } from "@tanstack/react-query";
import { API } from "../index";

export const registerUser = async (data) => {  
  const response = await axios.post(`${API.users.register}`, data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
