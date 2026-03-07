import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
