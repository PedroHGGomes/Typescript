import axios from "axios";

const client = axios.create({
  baseURL: "https://6414e8c38dade07073cb2a6a.mockapi.io/api/v1",
});

client.interceptors.request.use((config) => {
  config.headers["x-api-key"] = "b4b4bffb6a2e48e39890b823cf01675f";
  return config;
});

export default client;
