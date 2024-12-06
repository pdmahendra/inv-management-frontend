import axios from "../../utils/middleware";
import { API } from "../index";
import { toast } from "react-hot-toast";

const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API.upload.imgUpload}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Error uploading image.");
  }
};

export default handleImageUpload;