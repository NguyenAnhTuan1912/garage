import { useRoutes } from "react-router";

import { globalRoutes } from "./global-routes";

export default function ExtensionRoutes() {
  return useRoutes(globalRoutes);
}
