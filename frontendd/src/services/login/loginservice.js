import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

const loginapiService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/`, {
        email,
        password,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/signin`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default loginapiService;
