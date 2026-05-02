import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Import route configs
import { RouteConfigs } from "@/config/routes";

// Import modules
import { useMeQuery } from "@/modules/user/query";
import { useUserState, userStateSetters } from "@/modules/user/state";
import {
  useSignInMutation,
  useRefreshTokensMutation,
} from "@/modules/auth/query";

// Import types
import type { AxiosError } from "axios";

export function useAuth() {
  const navigate = useNavigate();

  const { isAuthenticated, data: user } = useUserState();
  const meQuery = useMeQuery();
  const signInMutation = useSignInMutation();
  const refreshTokensMutation = useRefreshTokensMutation();

  useEffect(() => {
    const user = meQuery.data?.data.data;

    if (!user) return;

    userStateSetters.setUser(user);
    userStateSetters.setIsAuthenticated(true);
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

  return {
    isAuthenticated,
    user,
    signInMutation,
    refreshTokensMutation,
  };
}
