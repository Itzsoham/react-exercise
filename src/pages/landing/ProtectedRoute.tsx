import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "./store/app.store";

const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
