import styles from "./DatosDelGarante.module.scss";
import { FieldRenderer } from "../FieldRenderer";
import { map } from "lodash";
import { RelationshipTypes } from "@/api";
import { useEffect, useState } from "react";

const relationshipTypesController = new RelationshipTypes();

export function DatosDelGarante(props) {
  const { component, values } = props;
  console.log("Datos del garante: ", component);
  const [relationships, setRelationships] = useState(null);

  const data = component?.data;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const relationshipTypesResponse =
          await relationshipTypesController.getAll();
        console.log("Relationship types: ", relationshipTypesResponse);
        setRelationships(relationshipTypesResponse);
      } catch (error) {
        console.log("Error fetching relationship types: ", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.datosDelGarante}>
      <div className="header">
        <h5>Datos del garante</h5>
      </div>

      <div className="fields">
        {map(data.attributes, (field, index) => {
          let value = null;
          let options = [];

          switch (field.name) {
            case "RelacionConElGarante":
              value = values[field.name];
              options =
                relationships && relationships?.data
                  ? [
                      { text: "Selecciona el tipo de relación", value: 0 },
                      ...relationships?.data?.map((relationship) => ({
                        text: `${relationship.attributes.label}`,
                        value: `${relationship.attributes.label}`,
                      })),
                    ]
                  : [];
              break;
              {
                /* case "CedulaDelGarante":
              value = values[field.name];
              break;
            case "NombreDelGarante":
              value = values[field.name];
              break;
            case "ApellidoDelGarante":
              value = values[field.name];
              break;
            case "ApodoDelGarante":
              value = values[field.name];
              break;
            case "CorreoDelGarante":
              value = values[field.name];
              break;
            case "TelefonoDelGarante":
              value = values[field.name];
              break;
            case "CelularDelGarante":
              value = values[field.name];
              break;
            case "RelacionConElGarante":
              value = values[field.name]; */
              }
          }

          return (
            <FieldRenderer
              key={index}
              field={{ ...field, options }}
              // name={`datosDelGarante.${field.name}`}
              // value={value}
              // {...props}
            />
          );
        })}
      </div>
    </section>
  );
}
