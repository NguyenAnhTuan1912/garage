// Import components
import UnauthorizedEmpty from "./unauthorized-empty";

// Import hooks
import { useAuth } from "@/hooks/use-auth";

export default function ProtectedRoute(props: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthorizedEmpty />;
  }

  return props.children;
}
