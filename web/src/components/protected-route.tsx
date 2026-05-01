import { Navigate, Outlet, useLocation } from "react-router";

// Import states
import { useUserState } from "@/modules/user/state";

export default function ProtectedRoute() {
  const { isAuthenticated } = useUserState();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
