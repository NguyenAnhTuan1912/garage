import { useRoutes } from "react-router";

// Import hooks
import { useAuth } from "@/hooks/use-auth";

import { authenticatedRoutes } from "./auth-routes";
import { unauthenticatedRoutes } from "./unauth-routes";

function LoadingSection() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-background">
      <p className="text-sm text-muted-foreground">
        Đang khởi động, vui lòng đợi trong giây lát...
      </p>
    </div>
  );
}

export default function AppRoutes() {
  const { isAuthenticated, refreshTokensMutation } = useAuth();

  const loadingShown =
    (refreshTokensMutation.isPending || !isAuthenticated) &&
    !refreshTokensMutation.isError;

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     const idToken = readCookie(CONFIGS.ID_TOKEN_COOKIE_NAME);
  //     if (idToken) {
  //       reSignInUserOffline(idToken);
  //     } else {
  //       const refreshToken = readCookie(CONFIGS.REFRESH_TOKEN_COOKIE_NAME);
  //       refreshTokensMutation.mutate({ refreshToken });
  //     }
  //   }
  // }, [isAuthenticated]);

  const routes = isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes;
  const element = useRoutes(routes);

  return loadingShown ? <LoadingSection /> : element;
}
