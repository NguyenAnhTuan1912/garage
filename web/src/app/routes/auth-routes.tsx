import { Navigate } from "react-router";

// Import configs
import { RouteConfigs } from "@/shared/config/routes";

// Import components
import NotFoundEmpty from "./components/not-found-empty";

// Import layouts
import DashboardLayout from "@/app/layouts/dashboard";

// Import pages
import HomePage from "@/app/pages/home";
import AccessControllPage from "@/app/pages/access-control";
import SettingsPage from "@/app/pages/settings";

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
        path: RouteConfigs.AccessControl.Path,
        element: <AccessControllPage />,
      },
      {
        path: RouteConfigs.Setting.Path,
        element: <SettingsPage />,
      },
      {
        path: "*",
        element: <Navigate to={RouteConfigs.NotFound.Path} replace />,
      },
    ],
  },
];
