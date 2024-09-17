import axios from "axios";

axios.defaults.withCredentials = true;

const apiRequest = axios.create({
  baseURL: "https://wtisc1.up.railway.app/",
  withCredentials: true,
  
});

export default apiRequest;