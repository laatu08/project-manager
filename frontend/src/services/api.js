import axios from "axios";

export const api = axios.create({
  // baseURL: "https://project-manager-62vb.vercel.app",
  baseURL: "https://project-manager-1iwt.onrender.com",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});