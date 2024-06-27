import styles from "./AffiliationForm.module.scss";
import { useState } from "react";
import { Form, Icon, Button } from "semantic-ui-react";
import { StepOne } from "./StepOne";
import { Container } from "@/components/Layout";
import { initialValues } from "./AffiliationForm.form";
import { useFormik } from "formik";
import { Affiliation } from "@/api";
import * as Yup from "yup";
import { PersonalInfo } from "./StepOne/PersonalInfo";

const affiliationController = new Affiliation();
const steps = [
  "Personal Information",
  "Employment Details",
  "Beneficiaries",
  "Agreements",
];

const validationSchema = [
  Yup.object({
    documentId: Yup.string()
      .min(11, "El número de cédula debe tener al menos 11 caracteres")
      .required(),
    firstName: Yup.string()
      .min(2, "El campo Nombre no debe tener menos de 2 caracteres")
      .max(50, "El campo nombre no debe tener más de 50 caracteres")
      .required("El campo Nombre es requerido"),
    lastName: Yup.string()
      .min(2, "El campo Apellido no debe tener menos de 2 caracteres")
      .max(50, "El campo Apellido no debe tener más de 50 caracteres")
      .required(),
    alias: Yup.string().min(
      2,
      "El campo Alias no debe tener menos de 2 caracteres"
    ),
    maritalStatus: Yup.string().required(),
    gender: Yup.string().required(),
    address: Yup.string()
      .min(4, "El campo Dirección no debe tener menos de 4 caracteres")
      .required(),
    address2: Yup.string().min(
      2,
      "El campo Sector o municipio no debe tener menos de 2 caracteres"
    ),
    country: Yup.number(),
    state: Yup.number(),
    city: Yup.number(),
    postalCode: Yup.string(),
    hasChildrens: Yup.boolean(),
    childrensQty: Yup.number().min(0).integer(),
    phone: Yup.string()
      .min(10, "El número de télefono debe tener al menos 10 caracteres")
      .max(11, "El número de télefono no puede tener más de 11 caracteres"),
    mobile: Yup.string()
      .min(10, "El número de celular debe tener al menos 10 caracteres")
      .max(11, "El número de celular no puede tener más de 11 caracteres"),
    email: Yup.string().email("Formato de correo invalido").required(),
  }),
  Yup.object({
    employmentInformation: Yup.string().required(),
  }),
  Yup.object({
    beneficiaries: Yup.string().required(),
  }),
  Yup.object({
    userAgreements: Yup.string().required(),
    userAuthorizations: Yup.string().required(),
    userDeclarations: Yup.string().required(),
  }),
];

export function AffiliationForm() {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema[step],
    onSubmit: async (values) => {
      if (step === steps.length - 1) {
        console.log("AffiliationForm values: ", values);
      } else {
        setStep(step + 1);
      }
    },
  });

  const onSubmit = async (formValues) => {
    try {
      console.log("Enviando solicitud de afiliacion: ", formValues);
      // await affiliationController.create(formValues);
      // console.log("Solicitud de afiliacion response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const stepComponents = [<StepOne {...formik} />];

  return (
    <Form onSubmit={formik.handleSubmit}>
      {step === 0 && <StepOne {...formik} />}
      {step === 1 && <p>Employment Details</p>}
      {step === 2 && <p>Beneficiaries</p>}
      {step === 3 && <p>Agreements</p>}
      <div className={styles.actions}>
        {step > 0 && (
          <Button secondary type="button" onClick={() => setStep(step - 1)}>
            <Icon name="arrow left" />
            Volver atras
          </Button>
        )}

        <Button primary type="submit">
          {step === steps.length - 1 ? (
            <>
              Enviar
              <Icon name="paper plane" />
            </>
          ) : (
            <>
              Continuar
              <Icon name="arrow right" />
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
