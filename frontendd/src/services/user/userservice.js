import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

const userapiService = {
  fetchUserData: async (user_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/get/${user_id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  fetchRegisteredUserData: async (user_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/view_trainings/${user_id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userapiService;
