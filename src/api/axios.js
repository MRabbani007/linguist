import axios from "axios";

export let SERVER_URL = "https://linguistserver.onrender.com";
SERVER_URL = "http://localhost:3000";

export default axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
