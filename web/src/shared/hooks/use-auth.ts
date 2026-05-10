import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";

// Import route configs
import { RouteConfigs } from "@/shared/config/routes";

// Import modules
import { useMeQuery } from "@/shared/modules/user/query";
import { useUserState, userStateSetters } from "@/shared/modules/user/state";
import {
  useSignInMutation,
  useRefreshTokensMutation,
} from "@/shared/modules/auth/query";

// Import helpers / utils
import * as CookiesUtils from "@/shared/utils/cookies";

// Import types
import type { AxiosError } from "axios";

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const origin = location.state?.from?.pathname || RouteConfigs.Home.Path;

  const { isAuthenticated, data: user } = useUserState();
  const meQuery = useMeQuery();
  const signInMutation = useSignInMutation();
  const refreshTokensMutation = useRefreshTokensMutation();

  useEffect(() => {
    const user = meQuery.data?.data.data;
    if (user) {
      userStateSetters.setUser(user);
      userStateSetters.setIsAuthenticated(true);
      
      if (location.pathname === RouteConfigs.SignIn.Path) {
        navigate(origin, { replace: true });
      }
    }
  }, [meQuery.data]);

  useEffect(() => {
    if (meQuery.isError) {
      refreshTokensMutation
        .mutateAsync()
        .then(() => {
          navigate(RouteConfigs.Home.Path);
          userStateSetters.setIsAuthenticated(true);
        })
        .catch((e: AxiosError) => {
          const responseData = e.response?.data as any;
          const msg = responseData?.error?.message || responseData?.message || e.response?.statusText;
          toast.error(msg, {
            toasterId: "global",
          });
          navigate(RouteConfigs.SignIn.Path);
          userStateSetters.setIsAuthenticated(false);
        });
    }
  }, [meQuery.isError]);

  const signout = function() {
    userStateSetters.setUser(undefined);
    userStateSetters.setIsAuthenticated(false);

    CookiesUtils.removeCookie("accessToken");
    CookiesUtils.removeCookie("refreshToken");

    navigate(RouteConfigs.SignIn.Path);
  }

  return {
    isAuthenticated,
    user,
    signInMutation,
    refreshTokensMutation,
    signout
  };
}
