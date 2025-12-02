import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const service = {
  getTasks: async () => {
    const result = await axios.get("/Items");
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post("/Items", {
      name: name,
      isComplete: false
    });
    return result.data;
  },

  setCompleted: async (id, name, isComplete) => {
    const result = await axios.put(
      `/Items/${id}`,
      { name: name, isComplete: isComplete },
      { headers: { "Content-Type": "application/json" } } // 💥 חובה
    );
    return result.data;
  },

  deleteTask: async (id) => {
    const result = await axios.delete(`/Items/${id}`);
    return result.data;
  }
};

export default service;
