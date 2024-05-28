import { useContext } from "react";
import { CalculatorContext } from "@/contexts";

export const useCalculator = () => useContext(CalculatorContext);
