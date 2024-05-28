import { useState, useEffect, createContext, useContext } from "react";

export const ServiceContext = createContext();

export function ServiceProvider(props) {
  const { children } = props;
  const [service, setService] = useState(null);

  useEffect(() => {
    // TODO: obtener servicio
  }, []);

  const data = {
    service,
  };

  return (
    <ServiceContext.Provider value={data}>{children}</ServiceContext.Provider>
  );
}
