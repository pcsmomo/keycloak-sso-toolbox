import { use } from "react";
import { AuthContext } from "./context";

/**
 * Hook for the AuthContext
 */
export const useAuth = () => use(AuthContext);
