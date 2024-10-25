import axios from "../../../utils/middleware";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { API } from "../../index";

export const getItems = async () => {
  const response = await axios.get(`${API.inventory.getItems}`);
  return response.data;
};

export const useFetchInventoryData = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: getItems,
  });
};

export const getItemsBySubcategory = async (subcategory) => {
  if (!subcategory) return;
  const response = await axios.get(
    `${API.inventory.getItemsBySubcategory}?type=${subcategory}`
  );
  return response.data.items;
};

export const useFetchItemsBySubcategory = (subcategory) => {
  return useQuery({
    queryKey: ["subCategoryItems", subcategory],
    queryFn: () => getItemsBySubcategory(subcategory), 
    enabled: !!subcategory,
  });
};

export const addItem = async (newItem) => {
  const response = await axios.post(`${API.inventory.addItems}`, newItem);
  return response.data;
};

export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
    },
    onError: (error) => {
      console.error("Add item error:", error);
    },
  });
};

export const editItem = async (data) => {
  const response = await axios.put(`${API.inventory.updateItems}`, data);
  return response.data;
};

export const useEditItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
    },
    onError: (error) => {
      console.error("Add item error:", error);
    },
  });
};

export const deleteItem = async (id) => {
  console.log(id);
  const response = await axios.delete(`${API.inventory.deleteItems}`, {
    data: { item_id: id },
  });
  return response.data;
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
    },
    onError: (error) => {
      console.error("Delete item error:", error);
    },
  });
};

export const getItem = async (id) => {
  const response = await axios.get(`${API.inventory.getItemById}/${id}`);
  return response.data;
};

export const useFetchItemData = (id) => {
  return useQuery({
    queryKey: ["rollInventory", id], // Use id in the query key for unique caching
    queryFn: () => getItem(id), // Call the getItem function with the id
    enabled: !!id, // Ensure the query only runs if the id is not null or undefined
  });
};
