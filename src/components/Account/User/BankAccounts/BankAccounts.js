import styles from "./BankAccounts.module.scss";
import { BankAccount } from "./BankAccount";
import { BankAccount as BankAccountApi, Bank, Currency } from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Block } from "@/components/Block";
import { Shared } from "@/components/Shared";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./BankAccount/BankAccount.form";
import { map } from "lodash";

const bankAccountController = new BankAccountApi();
const bankController = new Bank();
const currencyController = new Currency();

export function BankAccounts() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [bankAccounts, setBankAccounts] = useState(null);
  const [banks, setBanks] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [accountTypes, setAccountTypes] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const bankAccountsResponse = await bankAccountController.getAll(
            user.id
          );
          // console.log("USER BANK ACCOUNTS: ", bankAccountsResponse);
          setBankAccounts(bankAccountsResponse);
        } catch (error) {
          console.error("Error loading bank accounts: ", error);
        }
      })();
    }
  }, [reload, user]);

  useEffect(() => {
    (async () => {
      try {
        const banksResponse = await bankController.getFinancialInstitutions();
        // console.log("banksResponse: ", banksResponse);
        setBanks(banksResponse);
      } catch (error) {
        console.log("Error getting financial institutions: ", error);
      }
    })();
  }, [showModal]);

  useEffect(() => {
    (async () => {
      try {
        const currenciesResponse = await currencyController.getAll();
        // console.log("currenciesResponse: ", currenciesResponse);
        setCurrencies(currenciesResponse);
      } catch (error) {
        console.log("Error getting currencies: ", error);
      }
    })();
  }, [showModal]);

  useEffect(() => {
    (async () => {
      try {
        const accountTypesResponse = await bankController.getAccountTypes();
        // console.log("accountTypesResponse: ", accountTypesResponse);
        setAccountTypes(accountTypesResponse);
      } catch (error) {
        console.log("Error getting account types: ", error);
      }
    })();
  }, [showModal]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      // console.log(formValues);
      try {
        await bankAccountController.create(user.id, formValues);
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onReload = () => setReload((prevState) => !prevState);

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  const onClose = () => setShowModal((prevState) => !prevState);

  const handleFormikSelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h6 className={styles.title}>Mis Cuentas Bancarias</h6>
            <button className="add_button" onClick={handleShowModal}>
              <span>Añadir</span>
              <Block.MaterialIcon icon="add" height="16px" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              {bankAccounts?.data ? (
                <div className={styles.accounts}>
                  {bankAccounts.data.map((account) => {
                    {
                      /* console.log(account); */
                    }
                    return (
                      <BankAccount
                        key={account.id}
                        account={account}
                        onReload={onReload}
                        updateUser={updateUser}
                        reload={reload}
                      />
                    );
                  })}
                  <div className={styles.notes}>
                    {/* <p>NOTA</p> */}
                    <ul>
                      <li>
                        Cuando estableces una cuenta bancaria como
                        predeterminada, la misma se utilizará cuando establezcas
                        como metodo de desembolso "Transferencia" durante una
                        solicitud.
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Shared.NoResult text="No tienes cuentas bancarias registradas." />
              )}
            </div>
          </div>
        </div>
      </div>

      <Shared.AppModal
        show={showModal}
        onClose={handleShowModal}
        title="Añadir cuenta"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Select
            name="bank"
            label="Banco"
            options={map(banks?.data, (bank) => ({
              text: `${bank.attributes.name}`,
              value: bank.id,
            }))}
            onChange={handleFormikSelect}
            value={formik?.values?.bank}
            error={formik?.errors?.bank}
          />
          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="label"
              label="Etiqueta"
              placeholder="Asigne una etiqueta a esta cuenta"
              onChange={formik.handleChange}
              value={formik?.values?.label}
              error={formik?.errors?.label}
            />
            <Form.Input
              type="text"
              name="number"
              label="Número de cuenta"
              placeholder="Ingrese el número de cuenta"
              onChange={formik.handleChange}
              value={formik?.values?.number}
              error={formik?.errors?.number}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Select
              name="type"
              label="Tipo de cuenta"
              options={map(accountTypes?.data, (accountType) => ({
                text: `${accountType.attributes.label}`,
                value: accountType.id,
              }))}
              onChange={handleFormikSelect}
              value={formik?.values?.type}
              error={formik?.errors?.type}
            />
            <Form.Select
              name="currency"
              label="Moneda"
              options={map(currencies?.data, (currency) => ({
                text: `${currency.attributes.name}`,
                value: currency.id,
              }))}
              onChange={handleFormikSelect}
              value={formik?.values?.currency}
              error={formik?.errors?.currency}
            />
          </Form.Group>

          <div className={styles.actions}>
            <Form.Button type="submit" loading={formik.isSubmitting}>
              Guardar
            </Form.Button>
          </div>
        </Form>
      </Shared.AppModal>
    </>
  );
}
