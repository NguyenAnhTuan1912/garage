export const RouteConfigs = {
  Root: {
    Path: "/",
    Name: "",
  },
  Home: {
    Path: "/",
    Name: "Home",
  },
  Profile: {
    Path: "/profile/:profileId",
    Prefix: "/p",
    Name: "Profile",
  },
  Collection: {
    Path: "/collections/:collectionId",
    Prefix: "/collections",
    Name: "Collection",
  },
  Item: {
    Path: "/items/:itemId",
    Prefix: "/items",
    Name: "Collection",
  },
  Note: {
    Path: "/notes/:noteId",
    Prefix: "/notes",
    Name: "Note",
  },
  Setting: {
    Path: "/settings",
    Prefix: "/settings",
    Name: "Setting",
  },
  AccessControl: {
    Path: "/access-control",
    Prefix: "/access-control",
    Name: "Access Control",
  },
  SignIn: {
    Path: "/sign-in",
    Prefix: "/sign-in",
    Name: "Sign In",
  },
  SignUp: {
    Path: "/sign-up",
    Prefix: "/sign-up",
    Name: "Sign Up",
  },
  NotFound: {
    Path: "/not-found",
    Name: "Not Found",
  },
};

export const ExtensionRouteConfigs = {
  ...RouteConfigs,
  Home: {
    ...RouteConfigs.Home,
    Path: "/home",
    Name: "Home"
  },
  WorkBench: {
    Path: "/workbench",
    Name: "Workbench"
  }
};

export const routeNameByPath = (function () {
  const result: Record<string, string> = {};

  for (const routeKey in RouteConfigs) {
    let _key = routeKey as keyof typeof RouteConfigs;
    result[RouteConfigs[_key].Path] = RouteConfigs[_key].Name;
  }

  return result;
})();

export const extRouteNameByPath = (function () {
  const result: Record<string, string> = {};

  for (const routeKey in ExtensionRouteConfigs) {
    let _key = routeKey as keyof typeof ExtensionRouteConfigs;
    result[ExtensionRouteConfigs[_key].Path] = ExtensionRouteConfigs[_key].Name;
  }

  return result;
})();
