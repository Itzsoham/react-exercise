import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "@/pages/landing/store/app.store";
import { Navbar } from "@/components/Navbar";

const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
