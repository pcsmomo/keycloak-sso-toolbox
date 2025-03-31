import { useRef, useEffect } from "react";
import axios, { AxiosInstance } from "axios";

import { useSingleSignOn } from "./useSingleSignOn";

const createAxiosInstance = (
  baseURL: string,
  initialized: boolean,
  authenticated: boolean,
  token: string
) => {
  return axios.create({
    baseURL,
    headers: {
      Authorization:
        initialized && authenticated ? `Bearer ${token}` : undefined,
    },
  });
};

/**
 * Hook for the Axios instance
 * @param baseURL - The base URL for the Axios instance
 * @returns The Axios instance
 */
export const useAxios = (baseURL: string): AxiosInstance => {
  const { initialized, authenticated, token } = useSingleSignOn();

  const axiosInstanceRef = useRef<AxiosInstance>(
    createAxiosInstance(baseURL, initialized, authenticated, token)
  );

  useEffect(() => {
    const instance = createAxiosInstance(
      baseURL,
      initialized,
      authenticated,
      token
    );

    axiosInstanceRef.current = instance;
  }, [baseURL, initialized, authenticated, token]);

  return axiosInstanceRef.current;
};
