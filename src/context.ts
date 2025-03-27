import { createContext } from "react";
import { AuthContextType } from "./types";
import { useAxios } from "./useAxios";

export const defaultAuthContext: AuthContextType = {
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
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
