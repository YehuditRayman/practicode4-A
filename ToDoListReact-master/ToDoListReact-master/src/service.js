import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5216";

const service = {
  getTasks: async () => {
    const result = await axios.get("/items");
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post("/items", {
      name: name,
      isComplete: false
    });
    return result.data;
  },

  setCompleted: async (id, name, isComplete) => {
    const result = await axios.put(
      `/items/${id}`,
      { name: name, isComplete: isComplete },
      { headers: { "Content-Type": "application/json" } } // 💥 חובה
    );
    return result.data;
  },

  deleteTask: async (id) => {
    const result = await axios.delete(`/items/${id}`);
    return result.data;
  }
};

export default service;
