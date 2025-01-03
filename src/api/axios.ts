import { SERVER_URL } from "@/lib/url";
import axios from "axios";

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
