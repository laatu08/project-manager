import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  // 🔥 Check cookie/token on refresh
  useEffect(() => {
    const verify = async () => {
      try {
        await api.get("/auth/check", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
