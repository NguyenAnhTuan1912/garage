import { Navigate } from "react-router";

// Import configs
import { RouteConfigs } from "@/config/routes";

// Import components
import NotFoundEmpty from "./components/not-found-empty";

// Import layouts
import DashboardLayout from "@/layouts/dashboard";

// Import pages
import HomePage from "@/pages/home";

// Import types
import type { RouteObject } from "react-router";

/**
 * Array contains all authenticated routes (Main App)
 */
export const authenticatedRoutes: Array<RouteObject> = [
  {
    path: RouteConfigs.Root.Path,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: RouteConfigs.NotFound.Path,
        element: <NotFoundEmpty />,
      },
      {
        path: "*",
        element: <Navigate to={RouteConfigs.NotFound.Path} replace />,
      },
    ],
  },
];
