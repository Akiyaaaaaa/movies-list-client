import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL,
  // headers: { "ngrok-skip-browser-warning": "true" },
});
