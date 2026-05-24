import { Outlet, Navigate } from "react-router";

// Import configs
import { ExtensionRouteConfigs } from "@/shared/config/routes";

// Import components
import Home from "../components/home";
import Workbench from "../components/workbench";
import Collections from "../components/collections";
import CollectionItems from "../components/collection-items";
import AccessControlSettings from "../components/access-control-settings";
import EmptyUnderDevelopment from "@/shared/components/empty-under-development";
import Settings from "../components/settings";

// Import layouts
import GlobalWrapperLayout from "../layouts/global-wrapper";

// Import helpers / utils
import * as StringUtils from "@/shared/utils/string";

// Import types
import type { RouteObject } from "react-router";

export const globalRoutes: Array<RouteObject> = [
  {
    path: ExtensionRouteConfigs.Root.Path,
    element: (
      <GlobalWrapperLayout>
        <Outlet />
      </GlobalWrapperLayout>
    ),
    children: [
      {
        path: ExtensionRouteConfigs.Home.Path,
        element: <Home />,
      },
      {
        path: ExtensionRouteConfigs.WorkBench.Path,
        element: <Workbench />,
      },
      {
        path: StringUtils.formatURL(
          ExtensionRouteConfigs.Collection.Path,
          ExtensionRouteConfigs.Item.Path
        ),
        element: <Navigate to={ExtensionRouteConfigs.WorkBench.Path} replace />,
      },
      {
        path: ExtensionRouteConfigs.Collection.Path,
        element: <Collections />,
      },
      {
        path: StringUtils.formatURL(
          ExtensionRouteConfigs.Collection.Path,
          ExtensionRouteConfigs.Item.Prefix
        ),
        element: <CollectionItems />,
      },
      {
        path: ExtensionRouteConfigs.AccessControl.Path,
        element: <AccessControlSettings />,
      },
      {
        path: ExtensionRouteConfigs.Setting.Path,
        element: <Settings />,
      },
      {
        path: ExtensionRouteConfigs.NotFound.Path,
        element: <EmptyUnderDevelopment hasNavigation />,
      },
      {
        path: ExtensionRouteConfigs.Root.Path,
        element: <Navigate to={ExtensionRouteConfigs.Home.Path} replace />,
      },
      {
        path: "",
        element: <Navigate to={ExtensionRouteConfigs.Home.Path} replace />,
      },
      {
        path: "*",
        element: <Navigate to={ExtensionRouteConfigs.NotFound.Path} replace />,
      },
    ],
  },
];
