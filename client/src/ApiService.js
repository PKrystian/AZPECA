import axios from 'axios';

const API_BASE_URL = 'http://localhost:7071/api';

const ApiService = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/User`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getRegistrations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Registration`);
      return response.data;
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }
  },
};

export default ApiService;