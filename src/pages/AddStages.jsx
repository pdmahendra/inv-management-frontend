import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_BASE_URL } from "../api";
const API_URL = `${SERVER_BASE_URL}/stages`;
// Replace with your backend URL

const StagesPanel = () => {
  const [stages, setStages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all stages
  const fetchStages = async () => {
    try {
      const response = await axios.get(API_URL);
      setStages(response.data);
    } catch (error) {
      toast.error("Failed to fetch stages");
    }
  };

  // Add or update stage
  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      if (selectedStage) {
        // Update stage
        await axios.put(`${API_URL}/${selectedStage._id}`, {
          name,
          description,
        });
        toast.success("Stage updated successfully");
      } else {
        // Add new stage
        await axios.post(API_URL, { name, description });
        toast.success("Stage added successfully");
      }

      setShowModal(false);
      fetchStages();
    } catch (error) {
      toast.error("Failed to save stage");
    }
  };

  // Delete a stage
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Stage deleted successfully");
      fetchStages();
    } catch (error) {
      toast.error("Failed to delete stage");
    }
  };

  // Open modal for adding or editing a stage
  const handleEdit = (stage = null) => {
    setSelectedStage(stage);
    setName(stage ? stage.name : "");
    setDescription(stage ? stage.description : "");
    setShowModal(true);
  };

  useEffect(() => {
    fetchStages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Stages</h1>
      <button
        onClick={() => handleEdit()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
      >
        Add Stage
      </button>

      {/* Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {stages.map((stage) => (
          <div
            key={stage._id}
            className="p-4 bg-white shadow rounded-md border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800">{stage.name}</h2>
            <p className="text-gray-600 mt-2">
              {stage.description || "No description provided."}
            </p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleEdit(stage)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(stage._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {selectedStage ? "Edit Stage" : "Add Stage"}
            </h2>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Stage Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StagesPanel;
