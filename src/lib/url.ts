const local = false && window.location.hostname === "localhost";

export const SERVER_URL = local
  ? "http://localhost:3000"
  : "https://linguistserver.onrender.com";
