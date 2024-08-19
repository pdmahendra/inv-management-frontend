import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { API } from "../index";
import { useUser } from "../../context/UserContext";
export const loginUser = async (data) => {
  const response = await axios.post(`${API.users.login}`, data);
  return response.data;
};

export const useLogin = () => {
  const { setUser } = useUser();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { user, token } = data;
      
      localStorage.setItem("accessToken", token);
      setUser(user);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};
