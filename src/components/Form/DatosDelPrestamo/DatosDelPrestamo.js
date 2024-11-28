import styles from "./DatosDelPrestamo.module.scss";
import { FieldRenderer } from "../FieldRenderer";
import { map } from "lodash";
import { Form } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { Loan } from "@/api";
import { text } from "@fortawesome/fontawesome-svg-core";

const loanController = new Loan();

export function DatosDelPrestamo(props) {
  const { user } = useAuth();
  const { component, values } = props;
  console.log("Datos del prestamo: ", props);
  const [loanClassifications, setLoanClassifications] = useState(null);
  const [collaterals, setCollaterals] = useState(null);
  const [disbursementMethods, setDisbursementMethods] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const data = component?.data;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const loanClassificationsResponse = await loanController.getLoanTypes();
        console.log("Loan classifications: ", loanClassificationsResponse);
        if (isMounted) setLoanClassifications(loanClassificationsResponse);

        const collateralsResponse = await loanController.getLoanCollaterals();
        console.log("Collaterals: ", collateralsResponse);
        if (isMounted) setCollaterals(collateralsResponse);

        const disbursementMethodsResponse =
          await loanController.getLoanDisbursementMethods();
        console.log("Disbursement methods: ", disbursementMethodsResponse);
        if (isMounted) setDisbursementMethods(disbursementMethodsResponse);
      } catch (error) {
        console.log("Error fetching loan classifications: ", error);
      }
    })();

    // clear function
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.datosDelPrestamo}>
      <div className="header">
        <h5>Datos del préstamo</h5>
      </div>

      <div className="fields">
        {map(data.attributes, (field, index) => {
          let value = null;
          let options = [];

          switch (field.name) {
            case "Tipo":
              value = values[field.name];
              options =
                loanClassifications && loanClassifications?.data
                  ? [
                      { text: "Selecciona un tipo de préstamo", value: 0 },
                      ...loanClassifications?.data?.map((classification) => ({
                        text: `${classification?.attributes?.name}`,
                        value: classification.id,
                      })),
                    ]
                  : [];
              break;
            case "Monto":
              value = values[field.name];
              break;
            case "Plazo":
              value = values[field.name];
              break;
            case "Garantias":
              value = values[field.name];
              options =
                collaterals && collaterals?.data
                  ? [
                      { text: "Selecciona un tipo de garantía", value: 0 },
                      ...collaterals?.data?.map((collateral) => ({
                        text: `${collateral?.attributes?.name}`,
                        value: collateral.id,
                      })),
                    ]
                  : [];
              break;
            case "MetodoDeDesembolso":
              value = values[field.name];
              options =
                disbursementMethods && disbursementMethods?.data
                  ? [
                      { text: "Selecciona un metodo de desembolso", value: 0 },
                      ...disbursementMethods?.data?.map(
                        (disbursementMethod) => ({
                          text: `${disbursementMethod?.attributes?.name}`,
                          value: disbursementMethod.id,
                        })
                      ),
                    ]
                  : [];
              console.log("MetodoDeDesembolso options: ", options);
              break;
          }
          return (
            <FieldRenderer
              key={index}
              field={{ ...field, options }}
              // name={`datosDelPrestamo.${field.name}`}
              // value={value}
              // {...props}
            />
          );
        })}
      </div>
    </section>
  );
}
