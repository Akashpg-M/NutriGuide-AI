import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = {
  createUser: (userId) => axios.post(`${BASE_URL}/createuser`, { userId }),
  getWeather: () => axios.get(`${BASE_URL}/weather`).then((res) => res.data),
  updateConditions: (userId, conditions) =>
    axios.post(`${BASE_URL}/medical/${userId}`, { conditions }),
  getRecommendations: (userId, latitude, longitude) =>
    axios
      .post(`${BASE_URL}/recommend`, {
        userId,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      })
      .then((res) => res.data),
};

export default api;
