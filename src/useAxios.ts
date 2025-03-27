import { useRef, useEffect } from "react";
import axios, { AxiosInstance } from "axios";

import { useAuth } from "./useAuth";

/**
 * Hook for the Axios instance
 * @param baseURL - The base URL for the Axios instance
 * @returns The Axios instance
 */
export const useAxios = (baseURL: string): AxiosInstance => {
  const { initialized, authenticated, token } = useAuth();

  const axiosInstanceRef = useRef<AxiosInstance>(
    axios.create({
      baseURL,
      headers: {
        Authorization:
          initialized && authenticated ? `Bearer ${token}` : undefined,
      },
    })
  );

  useEffect(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        Authorization:
          initialized && authenticated ? `Bearer ${token}` : undefined,
      },
    });

    axiosInstanceRef.current = instance;
  }, [baseURL, initialized, authenticated, token]);

  return axiosInstanceRef.current;
};
