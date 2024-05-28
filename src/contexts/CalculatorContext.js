import { useState, useEffect, createContext } from "react";

export const CalculatorContext = createContext();

export function CalculatorProvider(props) {
  const { children } = props;
  const [monto, setMonto] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [tasa, setTasa] = useState(0);
  const [fixedCapital, setFixedCapital] = useState(false);
  const [durationInMonths, setDurationInMonths] = useState(false);
  const [monthlyRate, setMonthlyRate] = useState(false);

  const data = {
    loanAmount,
    duration,
    interestRate, // tasa
    fixedCapital,
    durationInMonths,
    monthlyRate,
    calculateMonthlyPayment: () => {},
    calculateTotalAmount: () => {},
    calculateTotalInterest: () => {},
    amortizeLoan: () => {},
    goToApplication: () => {},
  };

  return (
    <CalculatorContext.Provider value={data}>
      {children}
    </CalculatorContext.Provider>
  );
}
