import axios from "../../utils/middleware";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../index";

export const deleteUser = async ({ delete_user_id, adminPassword }) => {
  const response = await axios.delete(`${API.users.deleteUser}`, {
    data: {
      delete_user_id,
      adminPassword,
    },
  });
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllUsers"]);
    },
    onError: (error) => {
      console.error("Delete user error:", error);
    },
  });
};
