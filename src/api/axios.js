import axios from "axios";

// export const SERVER_URL = "http://localhost:3000";
export const SERVER_URL = "https://linguistserver.onrender.com";

export default axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
