import { useContext } from "react";
import { AccountContext } from "@/contexts";

export const useAccount = () => useContext(AccountContext || undefined);
