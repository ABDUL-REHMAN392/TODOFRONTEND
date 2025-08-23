import { useContext } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Todos from "../pages/Todos";

import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/todos" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/todos" /> : <Signup />}
      />
      <Route
        path="/todos"
        element={user ? <Todos /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
