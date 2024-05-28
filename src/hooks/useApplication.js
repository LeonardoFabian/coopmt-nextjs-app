import { useContext } from "react";
import { ApplicationContext } from "@/contexts";

export const useApplication = () => useContext(ApplicationContext);
