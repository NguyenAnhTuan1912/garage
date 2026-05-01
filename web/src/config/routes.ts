export const RouteConfigs = {
  Root: {
    Path: "/",
  },
  Home: {
    Path: "/",
  },
  Profile: {
    Path: "/p/:profileId",
    Prefix: "/p",
  },
  Collection: {
    Path: "/c/:collectionId",
    Prefix: "/c",
  },
  Note: {
    Path: "/n/:noteId",
    Prefix: "/n",
  },
  Setting: {
    Path: "/n",
    Prefix: "/n",
  },
  SignIn: {
    Path: "/sign-in",
    Prefix: "/sign-in"
  },
  SignUp: {
    Path: "/sign-up",
    Prefix: "/sign-up"
  },
  NotFound: {
    Path: "/not-found",
  },
};
