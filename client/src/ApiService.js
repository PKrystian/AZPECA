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

  createUser: async (user) => {
    try {
      if (typeof user.Balance === 'string') {
        user.Balance = parseFloat(user.Balance);
      }

      const response = await axios.post(`${API_BASE_URL}/User`, user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (user) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/User`, user);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/User`, { data: { Id: userId } });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  createRegistration: async (registration) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Registration`, registration);
      return response.data;
    } catch (error) {
      console.error('Error creating registration:', error);
      throw error;
    }
  },

  updateRegistration: async (registration) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/Registration`, registration);
      return response.data;
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  },

  deleteRegistration: async (registrationId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Registration`, { data: { Id: registrationId } });
      return response.data;
    } catch (error) {
      console.error('Error deleting registration:', error);
      throw error;
    }
  },
};

export default ApiService;
