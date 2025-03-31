import { ReactNode, useEffect, useMemo, useState } from "react";
import Keycloak from "keycloak-js";

// Contexts
import { SingleSignOnContext, defaultSingleSignOnContext } from "./context";

// Hooks
import { useAxios } from "./useAxios";

// Types
import { SingleSignOnContextType, KeycloakConfig } from "./types";

interface SingleSignOnProviderProps {
  children: ReactNode;
  keycloakConfig: KeycloakConfig;
}

export const SingleSignOnProvider = ({
  children,
  keycloakConfig,
}: SingleSignOnProviderProps) => {
  const keycloak = useMemo(
    () => new Keycloak(keycloakConfig),
    [keycloakConfig]
  );

  const [singleSignOnContext, setSingleSignOnContext] =
    useState<SingleSignOnContextType>(defaultSingleSignOnContext);

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
    if (singleSignOnContext.authenticated) {
      setSingleSignOnContext((prevContext) => ({
        ...prevContext,
        useAxios: currentUseAxios,
      }));
    }
  }, [currentUseAxios, singleSignOnContext.authenticated]);

  keycloak.onAuthSuccess = () => {
    setSingleSignOnContext({
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
    <SingleSignOnContext.Provider value={singleSignOnContext}>
      {children}
    </SingleSignOnContext.Provider>
  );
};
