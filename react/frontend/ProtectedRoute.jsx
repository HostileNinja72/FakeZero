import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";


import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN); // Vérifie un token dans le localStorage

  return isAuthenticated ? children : <Navigate to="/Login" />;
}

export default ProtectedRoute;
