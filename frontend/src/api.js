import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const createUser = (userId) =>
  axios.post(`${API_URL}/createuser`, { userId });
export const setMedical = (userId, conditions) =>
  axios.post(`${API_URL}/medical/${userId}`, { conditions });
export const getWeather = () => axios.get(`${API_URL}/weather`);
export const getRecommendations = (userId) =>
  axios.post(`${API_URL}/recommend`, {
    userId,
    latitude: 12.751493,
    longitude: 80.196708,
  });
