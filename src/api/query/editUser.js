import axios from "../../utils/middleware";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../index";

export const editUser = async ({ id, data }) => {
  const response = await axios.put(`${API.users.editUser}/${id}`, data);
  return response.data;
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllUsers"]);
    },
    onError: (error) => {
      console.error("Edit user error:", error);
    },
  });
};
