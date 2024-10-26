import axios from "../../utils/middleware";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { API } from "../index";

export const fetchIssuanceRecords = async () => {
  const response = await axios.get(`${API.issuance.getIssuanceRecords}`);
  return response.data;
};

export const useFetchIssuanceRecords = () => {
  return useQuery({
    queryKey: ["fetchIssuanceRecords"],
    queryFn: fetchIssuanceRecords,
  });
};

export const issueInventoryItems = async (payload) => {
  console.log(payload);
  const response = await axios.post(
    `${API.issuance.issueInventoryItems}`,
    payload
  );
  return response.data;
};

export const useIssueInventoryItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: issueInventoryItems,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "fetchIssuanceRecords",
        "fetchLotIssuanceRecords",
      ]);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};

export const fetchLotIssuanceRecords = async (id) => {
  const response = await axios.get(
    `${API.issuance.getLotIssuanceRecords}/${id}`
  );
  return response.data.issuanceRecord;
};

export const useLotFetchIssuanceRecords = (id) => {
  return useQuery({
    queryKey: ["fetchLotIssuanceRecords", id],
    queryFn: () => fetchLotIssuanceRecords(id),
    enabled: !!id,
  });
};