import { useState, useEffect, createContext } from "react";
import { Application } from "@/api";

const applicationController = new Application();

export const ApplicationContext = createContext();

export function ApplicationProvider(props) {
  const { children } = props;
  const [application, setApplication] = useState(null);

  useEffect(() => {
    // TODO: obtener datos de la application desde localStorage
    const response = applicationController.getLocalData();
    console.log("Application Local Data: ", response);
    setApplication(response);
  }, []);

  const fillApplication = (userId, serviceId) => {
    applicationController.fill(userId, serviceId);
  };

  const data = {
    application,
    fillApplication,
    submitApplication: () => {},
  };

  return (
    <ApplicationContext.Provider value={data}>
      {children}
    </ApplicationContext.Provider>
  );
}
