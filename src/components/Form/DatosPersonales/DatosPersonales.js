import styles from "./DatosPersonales.module.scss";
import { FieldRenderer } from "../FieldRenderer";
import { map } from "lodash";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { MaritalStatus } from "@/api";
import { text } from "@fortawesome/fontawesome-svg-core";

const maritalStatusController = new MaritalStatus();

export function DatosPersonales(props) {
  const { user } = useAuth();
  console.log("Datos personales user: ", user);
  console.log("Datos personales props: ", props);
  const { component, values } = props;
  console.log("Datos personales: ", component);
  const data = component?.data;

  const [maritalStatus, setMaritalStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const maritalStatusResponse = await maritalStatusController.find();
        console.log("maritalStatusResponse: ", maritalStatusResponse);
        setMaritalStatus(maritalStatusResponse);
      } catch (error) {
        console.log("Error loading marital status: ", error);
      }
    })();
  }, []);

  return (
    <section className={styles.datosPersonales}>
      <div className="header">
        <h5>Datos personales</h5>
      </div>

      <div className="fields">
        {map(data.attributes, (field, index) => {
          let value = null;
          let options = [];

          switch (field.name) {
            case "EstadoCivil":
              value = user ? user?.maritalStatus : values[field.name];
              options = maritalStatus?.data?.map((status) => ({
                text: `${status?.attributes?.label}`,
                value: status?.id,
              }));
              break;
          }

          return <FieldRenderer key={index} field={{ ...field, options }} />;
        })}
      </div>
    </section>
  );
}
