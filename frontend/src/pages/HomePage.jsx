import React, { useState, useEffect } from "react";
import api from "../services/api";

const HomePage = () => {
  const [userId, setUserId] = useState("");
  const [conditions, setConditions] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const createUser = async () => {
    try {
      const res = await api.createUser(userId);
      setConditions(res.data.conditions);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchWeather = async () => {
    try {
      const res = await api.getWeather();
      setWeather(res);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const updateMedicalConditions = async () => {
    try {
      await api.updateConditions(userId, conditions);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const getRecommendations = async () => {
    try {
      const res = await api.getRecommendations(userId, latitude, longitude);
      setRecommendations(res.recommendations);
      setWeather(res.weather);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">NutriGuide AI</h1>

      <div className="mb-4">
        <label>User ID:</label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="ml-2 p-1 border"
        />
        <button
          onClick={createUser}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Create/Get User
        </button>
      </div>

      <div className="mb-4">
        <label>Medical Conditions (comma separated):</label>
        <input
          value={conditions.join(",")}
          onChange={(e) => setConditions(e.target.value.split(","))}
          className="ml-2 p-1 border w-full"
        />
        <button
          onClick={updateMedicalConditions}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Update Conditions
        </button>
      </div>

      <div className="mb-4">
        <label>Latitude:</label>
        <input
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="ml-2 p-1 border"
        />
        <label className="ml-4">Longitude:</label>
        <input
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="ml-2 p-1 border"
        />
        <button
          onClick={getRecommendations}
          className="ml-2 px-3 py-1 bg-purple-500 text-white rounded"
        >
          Get Recommendations
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {weather && (
        <div className="mb-4">
          <p>
            <strong>Weather:</strong> {weather.condition} ({weather.temperature}
            &#8451;)
          </p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Food Recommendations:</h2>
          <ul className="list-disc pl-6">
            {recommendations.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>: {item.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
