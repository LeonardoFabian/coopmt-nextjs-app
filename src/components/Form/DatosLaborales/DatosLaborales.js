import styles from "./DatosLaborales.module.scss";
import { FieldRenderer } from "../FieldRenderer";
import { map } from "lodash";
import { Form } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { fn } from "@/utils";
import { EmploymentInformation } from "@/api";
import { useEffect, useState } from "react";

const employmentController = new EmploymentInformation();

export function DatosLaborales(props) {
  const { user } = useAuth();
  console.log("Datos laborales user: ", user);

  const { component, values } = props;
  const [employeeData, setEmployeeData] = useState(null);
  const [employmentSectors, setEmploymentSectors] = useState(null);
  const [employmentTypes, setEmploymentTypes] = useState(null);

  console.log("Datos laborales: ", props);
  const data = component?.data;

  useEffect(() => {
    const fetchEmploymentSectors = async () => {
      try {
        const employmentSectorsResponse =
          await employmentController.getEmploymentSectors();
        console.log("Employment sectors: ", employmentSectorsResponse);
        setEmploymentSectors(employmentSectorsResponse);
      } catch (error) {
        console.error("Error fetching employment sectors: ", error);
      }
    };

    const fetchEmploymentTypes = async () => {
      try {
        const employmentTypesResponse =
          await employmentController.getEmploymentTypes();
        console.log("Employment types: ", employmentTypesResponse);
        setEmploymentTypes(employmentTypesResponse);
      } catch (error) {
        console.error("Error fetching employment types: ", error);
      }
    };

    const fetchEmployeeData = async () => {
      try {
        const attributes = Array.isArray(component?.data?.attributes)
          ? component.data.attributes
          : Object.values(component?.data?.attributes || {});

        if (
          attributes.some(
            (field) => field.name === "TrabajaEnLaMismaInstitucion"
          )
        ) {
          const employeeDataResponse =
            await employmentController.getEmployeeDataFromTheSameInstitution(
              user?.username
            );
          console.log(
            "getEmployeeDataFromTheSameInstitution: ",
            employeeDataResponse
          );
          setEmployeeData(employeeDataResponse);
        }
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    };

    fetchEmploymentSectors();
    fetchEmploymentTypes();
    fetchEmployeeData();
  }, [user, component]);

  return (
    <section className={styles.datosLaborales}>
      <div className="header">
        <h5>Datos laborales</h5>
      </div>

      <div className="fields">
        {map(data.attributes, (field, index) => {
          let value = null;
          let options = [];

          switch (field.name) {
            case "TrabajaEnLaMismaInstitucion":
              value = employeeData?.data ? true : false;
              break;
            case "Sector":
              options =
                employmentSectors && employmentSectors?.data
                  ? [
                      { value: 0, text: "Seleccione una opción" },
                      ...employmentSectors?.data?.map((sector) => ({
                        value: sector.id,
                        text: sector?.attributes?.label,
                      })),
                    ]
                  : [];
              break;
            case "VinculoLaboral":
              options =
                employmentTypes && employmentTypes?.data
                  ? [
                      { value: 0, text: "Seleccione una opción" },
                      ...employmentTypes?.data?.map((type) => ({
                        value: type.id,
                        text: type?.attributes?.label,
                      })),
                    ]
                  : [];
              break;
            case "FechaDeIngreso":
              value =
                user && user?.currentJob
                  ? new Date(user?.currentJob?.startDate).toLocaleDateString(
                      "en-CA"
                    ) // "en-CA" genera el formato yyyy-MM-dd
                  : values[field.name];
              break;

              {
                /* case "FechaDeIngreso":
              value =
                user && user?.currentJob
                  ? new Date(user?.currentJob?.startDate)
                      .toISOString()
                      .split("T")[0]
                  : values[field.name];
              break; */
              }

              {
                /* case "LugarDeTrabajo":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.companyName
                  : values[field.name];
              break;
            case "Departamento":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.department
                  : values[field.name];
              break;
            case "Cargo":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.position
                  : values[field.name];
              break;
            case "Salario":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.salary
                  : values[field.name];
              break;
            case "DireccionTrabajo1":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.address
                  : values[field.name];
              break;
            case "DireccionTrabajo2":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.address2
                  : values[field.name];
              break;
            case "CiudadDondeLabora":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.city
                  : values[field.name];
              break;
            case "ProvinciaDondeLabora":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.state
                  : values[field.name];
              break;
            case "PaisDondeLabora":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.country
                  : values[field.name];
              break;
            case "TelefonoTrabajo":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.phone
                  : values[field.name];
              break;
            case "Extension":
              value =
                user && user?.currentJob
                  ? user?.currentJob?.ext
                  : values[field.name];
              break;
            case "FechaDeIngreso":
              value =
                user && user?.currentJob
                  ? new Date(user?.currentJob?.startDate)
                      .toISOString()
                      .split("T")[0]
                  : values[field.name];
              break; */
              }
          }

          return (
            <FieldRenderer
              key={index}
              field={{ ...field, options }}
              // name={`datosLaborales.${field.name}`}
              // value={value}
              // {...props}
            />
          );
        })}
      </div>
    </section>
  );
}
