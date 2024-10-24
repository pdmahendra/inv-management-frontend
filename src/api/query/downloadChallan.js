import axios from "../../utils/middleware";
import { API } from "../index";

export const downloadPdf = async (id) => {
  try {
    const response = await axios.get(`${API.production.generatePdf}/${id}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "order-details.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
export const downloadStagePdf = async (id,stageId) => {
  try {
    const response = await axios.get(`${API.lifecycle.generatePdf}/${id}/${stageId}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "stage-details.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
