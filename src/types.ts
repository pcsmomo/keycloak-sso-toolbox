import { AxiosInstance } from "axios";

export type KeycloakConfig = {
  url: string;
  realm: string;
  clientId: string;
};

export interface SingleSignOnContextType {
  initialized: boolean;
  authenticated: boolean;
  idToken: string; // openid token
  token: string; // access token
  refreshToken: string; // refresh token
  useAxios: (baseURL: string) => AxiosInstance;
  login: () => void;
  logout: () => void;
}
