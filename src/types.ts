import { AxiosInstance } from "axios";

export type KeycloakConfig = {
  url: string;
  realm: string;
  clientId: string;
};

export interface AuthContextType {
  initialized: boolean;
  authenticated: boolean;
  idToken: string;
  token: string;
  refreshToken: string;
  useAxios: (baseURL: string) => AxiosInstance;
  login: () => void;
  logout: () => void;
}
