import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your API base URL

const adminApiService = {
  createTraining: async (trainingData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/admin`,
        trainingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchDeletedTrainings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/deleted_trainings`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  restoreTraining: async (trainingId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/restore`, { id: trainingId });
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchUpcomingTrainings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/get_trainings`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteTraining: async (trainingId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/dtrain`, { training_id: trainingId });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default adminApiService;
