import axios from "axios";

axios.defaults.withCredentials = true;

const apiRequest = axios.create({
  baseURL: "http://localhost:8800",
  withCredentials: true,
  
});

export default apiRequest;