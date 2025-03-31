import { use } from "react";
import { SingleSignOnContext } from "./context";

/**
 * Hook for the SingleSignOnContext
 */
export const useSingleSignOn = () => use(SingleSignOnContext);
