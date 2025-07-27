# 🥗 Smart Food Recommendation API (NutriClime)

This is the backend of the **Smart Food Choice Application**, developed for the **Samsung Solve for Tomorrow Hackathon**. The app helps users make better food choices by recommending meals based on:

- Their **medical conditions** (e.g., diabetes, hypertension)
- The **current weather conditions** at their location

---

## 🚀 Features

- User registration with medical condition tracking
- Real-time weather integration using location data
- Intelligent food recommendations powered by AI and weather context
- Modular REST API built with Express and PostgreSQL (via Prisma ORM)

---

## 🧠 Backend Logic Overview

1. **User & Medical Data**  
   Each user has a unique `userId`. Medical conditions are stored for that user and can be retrieved or updated.

2. **Weather Integration**  
   Using geolocation (`latitude`, `longitude`), the backend fetches current weather data (e.g., sunny, humid, cold).

3. **Food Recommendation Engine**  
   The app uses:
   - Medical conditions
   - Weather data  
   to generate healthy food options (optionally powered by an AI like **Gemini API**).

---

## 🛠️ Tech Stack

| Component      | Technology        |
|----------------|------------------|
| Runtime        | Node.js           |
| Framework      | Express.js        |
| ORM            | Prisma            |
| Database       | PostgreSQL        |
| External APIs  | OpenWeatherMap API, Gemini API |
| Documentation  | Postman           |
| Version Control| Git & GitHub      |

---

## 🔌 API Endpoints

| Method | Endpoint                      | Description                                       |
|--------|-------------------------------|---------------------------------------------------|
| GET    | `/api/weather`                | Get current weather data (temperature, humidity) |
| GET    | `/api/medical/:userId`        | Get medical conditions for a user                |
| POST   | `/api/medical/:userId`        | Set or update medical conditions for a user      |
| POST   | `/api/recommend`              | Get food recommendations based on medical and climate data |

📬 **Test all endpoints via Postman:**  
🔗 [View Postman Collection](./docs/postman_collection.json)
