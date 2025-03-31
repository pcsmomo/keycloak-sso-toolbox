import { ReactNode, useEffect, useMemo, useState } from "react";
import Keycloak from "keycloak-js";

// Contexts
import { AuthContext, defaultAuthContext } from "./context";

// Hooks
import { useAxios } from "./useAxios";

// Types
import { AuthContextType, KeycloakConfig } from "./types";

interface AuthProviderProps {
  children: ReactNode;
  config: KeycloakConfig;
}

export const AuthProvider = ({ children, config }: AuthProviderProps) => {
  const keycloak = useMemo(() => new Keycloak(config), [config]);

  const [authContext, setAuthContext] =
    useState<AuthContextType>(defaultAuthContext);

  // Get the current useAxios implementation
  const currentUseAxios = useAxios;

  useEffect(() => {
    if (!keycloak.didInitialize) {
      keycloak.init({
        onLoad: "login-required",
        redirectUri: location.href,
        checkLoginIframe: false, // temporary option as it refreshes the page
      });
    }
  }, [keycloak]);

  // Update auth context when useAxios changes with authrization header
  useEffect(() => {
    // this would happen after keycloak.onAuthSuccess
    if (authContext.authenticated) {
      setAuthContext((prevContext) => ({
        ...prevContext,
        useAxios: currentUseAxios,
      }));
    }
  }, [currentUseAxios, authContext.authenticated]);

  keycloak.onAuthSuccess = () => {
    setAuthContext({
      initialized: keycloak.didInitialize,
      authenticated: keycloak.authenticated ?? false,
      idToken: keycloak.idToken ?? "",
      token: keycloak.token ?? "",
      refreshToken: keycloak.refreshToken ?? "",
      useAxios: currentUseAxios,
      login: keycloak.login,
      logout: keycloak.logout,
    });
  };

  keycloak.onAuthError = (error) => {
    console.error("Keycloak auth error", error);
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
