import { Outlet, Navigate } from "react-router";

// Import configs
import { RouteConfigs } from "@/config/routes";

// Import components
import { SigninForm } from "@/pages/auth/components/signin-form";

// Import pages
import AuthPage from "@/pages/auth";

// Import types
import type { RouteObject } from "react-router";

/**
 * Array contains all unanthentication routes
 */
export const unauthenticatedRoutes: Array<RouteObject> = [
  {
    path: RouteConfigs.Root.Path,
    element: (
      <AuthPage>
        <Outlet />
      </AuthPage>
    ),
    children: [
      {
        path: RouteConfigs.SignIn.Path,
        element: <SigninForm />,
      },
      {
        path: RouteConfigs.Root.Path,
        element: <Navigate to={RouteConfigs.SignIn.Path} replace />,
      },
      {
        path: "",
        element: <Navigate to={RouteConfigs.SignIn.Path} replace />,
      },
      {
        path: "*",
        element: <Navigate to={RouteConfigs.SignIn.Path} replace />,
      },
    ],
  },
];
