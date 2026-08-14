import axios from 'axios'

const apiClient = axios.create({
  // Vite runs on port 5173; the FastAPI service runs separately on port 8000.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1'
})

export default apiClient

// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/v1",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export default api;
