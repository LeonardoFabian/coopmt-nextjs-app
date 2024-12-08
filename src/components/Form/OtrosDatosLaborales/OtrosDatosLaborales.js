import styles from "./OtrosDatosLaborales.module.scss";
import { FieldRenderer } from "../FieldRenderer";
import { map, set } from "lodash";
import { Form } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { EmploymentInformation, User } from "@/api";
import { useEffect, useState } from "react";

const userController = new User();
const employmentController = new EmploymentInformation();

export function OtrosDatosLaborales(props) {
  const { user } = useAuth();

  const { component, values, setFieldValue } = props;
  const [employeeData, setEmployeeData] = useState(null);

  console.log("Otros Datos laborales: ", props);

  const data = component?.data;

  const [userGroups, setUserGroups] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const userGroupsResponse = await userController.getUserGroups();
        console.log("User groups: ", userGroupsResponse);
        setUserGroups(userGroupsResponse);

        const attributes = Array.isArray(component?.data?.attributes)
          ? component.data.attributes
          : Object.values(component?.data?.attributes || {});

        if (attributes.some((field) => field.name === "Grupo")) {
          const employeeDataResponse =
            await employmentController.getEmployeeDataFromTheSameInstitution(
              user?.username
            );
          console.log("OtrosDatosLaborales Grupo: ", employeeDataResponse);
          setEmployeeData(employeeDataResponse);
        }
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    };

    // fetchUserGroups();
    fetchEmployeeData();
  }, []);

  useEffect(() => {}, []);

  if (values.TrabajaEnLaMismaInstitucion === false) {
    return null;
  }

  return (
    <section className={styles.otrosDatosLaborales}>
      <div className="header">
        <h5>Otros datos laborales</h5>
      </div>

      <div className="fields">
        {map(data.attributes, (field, index) => {
          let value = null;
          let options = [];
          {
            /* let readOnly = false;
          let disabled = false; */
          }

          switch (field.name) {
            case "Grupo":
              const matchedUserGroup = userGroups?.data?.find(
                (group) => group.attributes.name === employeeData?.data?.GRUPO
              );
              value = matchedUserGroup ? matchedUserGroup.id : null;
              {
                /* setFieldValue("Grupo", value); */
              }
              {
                /* value = employeeData?.data?.GRUPO; */
              }
              {
                /* console.log(
                "employeeData?.data?.GRUPO: ",
                employeeData?.data?.GRUPO
              ); */
              }
              options = userGroups?.data?.map((userGroup) => ({
                key: userGroup.id,
                text: `${userGroup?.attributes?.name}`,
                value: userGroup?.id,
              }));
              {
                /* readOnly = true;
              disabled = true; */
              }
              break;
            case "EsEmpleadoDeCarrera":
              value = employeeData
                ? employeeData?.data?.CARRERA_ADMINISTRATIVA == "S"
                  ? true
                  : false
                : false;
              {
                /* setFieldValue("EsEmpleadoDeCarrera", value); */
              }

              break;
          }

          return (
            <FieldRenderer
              key={index}
              field={{ ...field, options }}
              // name={`otrosDatosLaborales.${field.name}`}
              // value={value}
              // {...props}
            />
          );
        })}
      </div>
    </section>
  );
}
