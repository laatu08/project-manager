import axios from "axios";

export const api = axios.create({
  baseURL: "https://project-manager-1iwt.onrender.com",
  withCredentials: true,
});