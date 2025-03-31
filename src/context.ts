import { createContext } from "react";
import { SingleSignOnContextType } from "./types";
import { useAxios } from "./useAxios";

export const defaultSingleSignOnContext: SingleSignOnContextType = {
  initialized: false,
  authenticated: false,
  idToken: "",
  token: "",
  refreshToken: "",
  useAxios,
  login: () => {},
  logout: () => {},
};

/**
 * Context for the Keycloak instance
 */
export const SingleSignOnContext = createContext<SingleSignOnContextType>(
  defaultSingleSignOnContext
);
