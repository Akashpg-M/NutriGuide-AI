import React, { useState } from 'react';
import { createUser, setMedical, getWeather, getRecommendations } from './api';

function App() {
  const [userId, setUserId] = useState('');
  const [condition, setCondition] = useState('');
  const [conditions, setConditions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');

  const handleCreateUser = async () => {
    try {
      const res = await createUser(userId);
      setMessage('User created: ' + res.data.data.userId);
      setConditions(res.data.data.conditions);
    } catch (err) {
      setMessage('Error creating user');
    }
  };

  const handleAddCondition = () => {
    if (condition) {
      setConditions([...conditions, condition]);
      setCondition('');
    }
  };

  const handleSaveConditions = async () => {
    await setMedical(userId, conditions);
    setMessage('Conditions saved.');
  };

  const handleGetWeather = async () => {
    const res = await getWeather();
    setWeather(res.data);
  };

  const handleGetRecommendations = async () => {
    const res = await getRecommendations(userId);
    setRecommendations(res.data.recommendations);
  };

  return (
    <div>
      <h1>NutriGuide AI</h1>
      <p>{message}</p>
      <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder=\"User ID\" />
      <button onClick={handleCreateUser}>Create/Get User</button>
      <br/><br/>
      <input value={condition} onChange={(e) => setCondition(e.target.value)} placeholder=\"Add Condition\" />
      <button onClick={handleAddCondition}>Add</button>
      <button onClick={handleSaveConditions}>Save Conditions</button>
      <ul>{conditions.map((c, i) => <li key={i}>{c}</li>)}</ul>
      <br/>
      <button onClick={handleGetWeather}>Get Weather</button>
      {weather && <p>{weather.condition} - {weather.temperature}°C</p>}
      <br/>
      <button onClick={handleGetRecommendations}>Get Food Recommendations</button>
      <ul>{recommendations.map((r, i) => <li key={i}>{r.name}: {r.reason}</li>)}</ul>
    </div>
  );
}

export default App;
