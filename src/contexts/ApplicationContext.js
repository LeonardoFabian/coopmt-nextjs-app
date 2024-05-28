import { useState, useEffect, createContext } from "react";

export const ApplicationContext = createContext();

export function ApplicationProvider(props) {
  const { children } = props;
  const [application, setApplication] = useState(null);

  useEffect(() => {
    // TODO: obtener application
  }, []);

  const data = {
    application,
    submitApplication: () => {},
  };

  return (
    <ApplicationContext.Provider value={data}>
      {children}
    </ApplicationContext.Provider>
  );
}
