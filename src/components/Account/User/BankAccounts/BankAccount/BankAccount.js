import styles from "./BankAccount.module.scss";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { Block } from "@/components/Block";
import { BankAccount as BankAccountApi, Currency, Bank } from "@/api";
import { useRouter } from "next/router";
import { Shared } from "@/components/Shared";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./BankAccount.form";
import { map } from "lodash";
import { text } from "@fortawesome/fontawesome-svg-core";

const bankAccountController = new BankAccountApi();
const currencyController = new Currency();
const bankController = new Bank();

export function BankAccount(props) {
  const { account, onReload } = props;
  console.log("account: ", account);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [banks, setBanks] = useState(null);
  const [accountTypes, setAccountTypes] = useState(null);

  const number = account?.attributes?.number;
  const currency = account?.attributes?.currency?.data;
  const currencyName = currency?.attributes?.name;
  const currencySymbol = currency?.attributes?.symbol;
  const label = account?.attributes?.label;
  const bank = account?.attributes?.bank?.data;
  const bankName = bank?.attributes?.name;
  const type = account?.attributes?.type?.data;
  const typeLabel = type?.attributes?.label;

  useEffect(() => {
    (async () => {
      try {
        const banksResponse = await bankController.getFinancialInstitutions();
        console.log("banksResponse: ", banksResponse);
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
        console.log("currenciesResponse: ", currenciesResponse);
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
        console.log("accountTypesResponse: ", accountTypesResponse);
        setAccountTypes(accountTypesResponse);
      } catch (error) {
        console.log("Error getting account types: ", error);
      }
    })();
  }, [showModal]);

  const formik = useFormik({
    initialValues: initialValues(bank.id, currency.id, type.id, number, label),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log("formValues: ", formValues);
      try {
        if (account.id) {
          await bankAccountController.update(account.id, user.id, formValues);
        } else {
          await bankAccountController.create(user.id, formValues);
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onClose = () => {
    setShowModal(false);
  };
  const handleShowModal = () => setShowModal((prevState) => !prevState);
  const handleShowConfirm = () => setShowConfirm((prevState) => !prevState);

  const handleFormikSelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
  };

  const deleteOnConfirm = async () => {
    try {
      await bankAccountController.delete(account.id);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <div className={styles.info}>
                <div className={styles.label}>{label}</div>
                <div className={styles.data}>
                  <span>{bankName}</span>
                  <span>
                    {typeLabel} en {currencyName} ({currencySymbol})
                  </span>
                  <span>{number}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button className="edit_button" onClick={handleShowModal}>
                  <span>Editar</span>
                  <Block.MaterialIcon icon="edit" height="16px" />
                </button>
                <button className="delete_button" onClick={handleShowConfirm}>
                  <span>Eliminar</span>
                  <Block.MaterialIcon icon="delete" height="16px" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Editar cuenta bancaria"
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

      <Shared.Confirm
        open={showConfirm}
        onCancel={handleShowConfirm}
        onConfirm={deleteOnConfirm}
        content="¿Deseas eliminar este número de cuenta?"
      />
    </>
  );
}
