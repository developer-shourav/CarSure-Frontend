import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function ProtectedRoutes() {
  const user = useAppSelector(selectCurrentUser);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
