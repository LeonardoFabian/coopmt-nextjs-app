import { useState, useEffect, createContext, useContext } from "react";

export const ServiceContext = createContext();

export function ServiceProvider(props) {
  const { children } = props;
  const [service, setService] = useState(null);

  console.log("ServiceProvider...");

  useEffect(() => {
    // TODO: obtener servicio
  }, []);

  const data = {
    service,
    // calculateLoan: null,
    checkMyRate: () => {},
    sendApplication: () => {},
    checkApplicationStatus: () => {},
    sendReview: () => {},
  };

  return (
    <ServiceContext.Provider value={data}>{children}</ServiceContext.Provider>
  );
}
