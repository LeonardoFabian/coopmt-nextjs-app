import styles from "./CuentaBancaria.module.scss";
import { FieldRenderer } from "../FieldRenderer";
import { map } from "lodash";
import { useAuth } from "@/hooks";
import { Bank } from "@/api";
import { useEffect, useState } from "react";
import { text } from "@fortawesome/fontawesome-svg-core";

const bankController = new Bank();

export function CuentaBancaria(props) {
  const { user } = useAuth();
  console.log("user: ", user);
  const { component, values } = props;
  console.log("Cuenta Bancaria: ", component);
  const [banks, setBanks] = useState(null);
  const [accountTypes, setAccountTypes] = useState(null);

  const data = component?.data;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const banksResponse = await bankController.getFinancialInstitutions();
        console.log("Banks: ", banksResponse);
        if (isMounted) setBanks(banksResponse);

        const accountTypesResponse = await bankController.getAccountTypes();
        console.log("Account types: ", accountTypesResponse);
        if (isMounted) setAccountTypes(accountTypesResponse);
      } catch (error) {
        console.log("Error fetching banks: ", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.cuentaBancaria}>
      <div className="header">
        <h5>Cuenta Bancaria</h5>
      </div>

      <div className="fields">
        {map(data.attributes, (field, index) => {
          let value = null;
          let options = [];

          switch (field.name) {
            case "EntidadFinanciera":
              value =
                user?.defaultBankAccount && user?.defaultBankAccount?.bank
                  ? user?.defaultBankAccount?.bank?.id
                  : values[field.name];
              options = banks?.data?.map((bank) => ({
                text: `${bank?.attributes?.name}`,
                value: bank?.id,
              }));
              break;
            case "TipoDeCuenta":
              value =
                user?.defaultBankAccount && user?.defaultBankAccount?.type
                  ? user?.defaultBankAccount?.type?.id
                  : values[field.name];
              options = accountTypes?.data?.map((accountType) => ({
                text: `${accountType?.attributes?.label}`,
                value: accountType?.id,
              }));
              break;
              {
                /* case "NumeroDeCuenta":
              value = user?.defaultBankAccount
                ? user?.defaultBankAccount?.number
                : values[field.name];
              break; */
              }
          }

          return (
            <FieldRenderer
              key={index}
              field={{ ...field, options }}
              // name={`cuentaBancaria.${field.name}`}
              // value={value}
              // {...props}
            />
          );
        })}
      </div>
    </section>
  );
}
