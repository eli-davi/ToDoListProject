import axios from 'axios';

const apiUrl = "http://localhost:5185";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/items`)    
    return result.data;
  },

  addTask: async (name) => {
  const result = await axios.post(`${apiUrl}/items`, {
    name: name,
    isComplete: false
  });

  return result.data;
},

 setCompleted: async (id, isComplete) => {
  const result = await axios.put(`${apiUrl}/items/${id}`, {
    isComplete: isComplete
  });

  return result.data;
},
deleteTask: async (id) => {
  await axios.delete(`${apiUrl}/items/${id}`);
},

};
