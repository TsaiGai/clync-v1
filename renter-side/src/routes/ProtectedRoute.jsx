import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext"; 

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); 

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
