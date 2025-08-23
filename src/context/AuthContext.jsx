import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        { username, password },
        { withCredentials: true }
      );

      if (!data.user) throw new Error("User data missing from response");

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/signup",
        { username, email, password },
        { withCredentials: true }
      );

      if (!data.status) {
        return { success: false, message: data.message || "Signup failed" };
      }

      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
