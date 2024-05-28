import { useContext } from "react";
import { ServiceContext } from "@/contexts";

export const useService = () => useContext(ServiceContext);
