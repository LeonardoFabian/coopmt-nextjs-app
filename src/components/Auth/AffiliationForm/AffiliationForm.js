import { useRef, forwardRef } from "react";
import styles from "./AffiliationForm.module.scss";
import { useState } from "react";
import { Form, Icon, Button } from "semantic-ui-react";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { StepFive } from "./StepFive";
import { StepFinal } from "./StepFinal";
import { Container } from "@/components/Layout";
import { initialValues } from "./AffiliationForm.form";
import { useFormik, FormikProvider } from "formik";
import { Affiliation, File, Membership } from "@/api";
import * as Yup from "yup";
import { PersonalInfo } from "./StepOne/PersonalInfo";
import { toast } from "react-toastify";
// import ReactToPrint from "react-to-print";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// import logger from "../../../../clientLogger";

const affiliationController = new Affiliation();
const membershipController = new Membership();
const fileController = new File();

const checkDocumentIdExists = async (documentId) => {
  try {
    // verificar si existe un número de afiliación con este documento
    const affiliationResponse = await affiliationController.findByDocumentId(
      documentId
    );
    // console.log(affiliationResponse);

    if (affiliationResponse.data.length > 0) {
      return true;
    }
    // verificar si existe un socio con este documento
    const membershipResponse = await membershipController.check(documentId);
    // console.log(membershipResponse);

    if (membershipResponse.isMember) {
      return true;
    }

    // console.log(response);
    return false;
  } catch (error) {
    console.error("Error checking document ID: ", error);
    return false;
  }
};

const steps = [
  "Personal Information",
  "Employment Details",
  "Beneficiaries",
  "File Upload",
  "Agreements",
  "Confirmation",
];

const validationSchema = [
  Yup.object({
    documentId: Yup.string()
      .min(11, "El número de cédula debe tener al menos 11 caracteres")
      .required("El número de cédula es requerido.")
      .test(
        "checkDocumentIdExists",
        "Ya existe un socio o una solicitud de afiliación con este número de documento",
        async (value) => {
          if (!value) return false;
          const exists = await checkDocumentIdExists(value);
          return !exists;
        }
      ),
    firstName: Yup.string()
      .min(2, "El campo Nombre no debe tener menos de 2 caracteres")
      .max(50, "El campo nombre no debe tener más de 50 caracteres")
      .required("El campo Nombre es requerido"),
    lastName: Yup.string()
      .min(2, "El campo Apellido no debe tener menos de 2 caracteres")
      .max(50, "El campo Apellido no debe tener más de 50 caracteres")
      .required("El campo Apellido es requerido"),
    alias: Yup.string().min(
      2,
      "El campo Alias no debe tener menos de 2 caracteres"
    ),
    maritalStatus: Yup.string().required("El estado civil es requerido."),
    gender: Yup.string().required("El género es requerido."),
    location: Yup.object({
      address: Yup.string()
        .min(4, "El campo Dirección no debe tener menos de 4 caracteres")
        .required("La dirección es requerida."),
      address2: Yup.string()
        .min(
          2,
          "El campo Sector o municipio no debe tener menos de 2 caracteres"
        )
        .required("El campo Sector o Municipio es requerido."),
      country: Yup.number()
        .required("El País de domicilio es requerido.")
        .min(1, "Debes seleccionar tu país de domicilio")
        .default(0),
      state: Yup.number()
        .required("El Estado o Provincia de domicilio es requerido.")
        .min(1, "Debes seleccionar tu Estado o Provincia de domicilio")
        .default(0),
      city: Yup.number()
        .required("La Ciudad o Municipio  de domicilio es requerido.")
        .min(1, "Debes seleccionar tu Ciudad o Municipio de domicilio")
        .default(0),
      postalCode: Yup.string(),
    }),
    hasChildrens: Yup.bool()
      .required("Debes seleccionar una opción")
      .default(false),
    childrensQty: Yup.number().min(0).integer(),
    phone: Yup.string()
      .min(10, "El número de télefono debe tener al menos 10 caracteres")
      .max(11, "El número de télefono no puede tener más de 11 caracteres"),
    mobile: Yup.string()
      .min(10, "El número de celular debe tener al menos 10 caracteres")
      .max(11, "El número de celular no puede tener más de 11 caracteres"),
    email: Yup.string()
      .email("Formato de correo invalido")
      .required("El correo electrónico es requerido."),
  }),
  Yup.object({
    employmentInformation: Yup.object({
      companyName: Yup.string().required(
        "El nombre de la empresa o institución es requerido."
      ),
      sector: Yup.string().required("El sector al que pertenece es requerido."),
      department: Yup.string().required(
        "El nombre del departamento es requerido."
      ),
      isCareerEmployee: Yup.boolean(),
      employmentType: Yup.string().required(
        "Su vinculo laboral con la empresa requerido."
      ),
      salary: Yup.number().min(0).required("El salario es requerido."),
      employmentCountry: Yup.number(),
      employmentState: Yup.number(),
      employmentCity: Yup.number(),
      employmentAddress: Yup.string().required(
        "Domicilio (calle, casa, edificio, apartamento) requerido."
      ),
      employmentAddress2: Yup.string(),
      employmentPhone: Yup.string()
        .min(10, "El número de télefono debe tener al menos 10 caracteres")
        .max(11, "El número de télefono no puede tener más de 11 caracteres")
        .required("El télefono es requerido."),
      employmentPhoneExt: Yup.string(),
    }),
  }),
  Yup.object({
    beneficiaries: Yup.array().of(
      Yup.object({
        beneficiaryDocumentId: Yup.string(),
        beneficiaryFirstName: Yup.string()
          .min(2, "El campo Nombre no debe tener menos de 2 caracteres")
          .max(50, "El campo nombre no debe tener más de 50 caracteres"),
        beneficiaryLastName: Yup.string()
          .min(2, "El campo Apellido no debe tener menos de 2 caracteres")
          .max(50, "El campo Apellido no debe tener más de 50 caracteres"),
        beneficiaryPhone: Yup.string()
          .min(10, "El número de télefono debe tener al menos 10 caracteres")
          .max(11, "El número de télefono no puede tener más de 11 caracteres"),
        beneficiaryMobile: Yup.string()
          .min(10, "El número de celular debe tener al menos 10 caracteres")
          .max(11, "El número de celular no puede tener más de 11 caracteres"),
        beneficiaryEmail: Yup.string().email("Formato de correo invalido"),
        beneficiaryRelationship: Yup.string(),
        beneficiaryNote: Yup.string(),
        beneficiaryBirthDate: Yup.string(),
      })
    ),
  }),
  Yup.object({
    documentIdFront: Yup.mixed().required(
      "Es necesario subir una foto de tu cédula de identidad (frente)."
    ),
    documentIdBack: Yup.mixed().required(
      "Es necesario subir una foto de tu cédula de identidad (reverso)."
    ),
  }),
  Yup.object({
    monthlySavingsAccepted: Yup.bool()
      .oneOf([true], "Debes autorizar el descuento mensual.")
      .required("Debes autorizar el descuento mensual."),
    monthlySavingsContribution: Yup.number()
      .min(100, "El mínimo debe ser de RD$100")
      .required("Debes ingresar el valor del descuento mensual."),
    enrollmentPaymentAccepted: Yup.bool()
      .oneOf([true], "Debes aceptar el pago de inscripción")
      .default(false),
    enrollmentPayment: Yup.number()
      .min(200, "El costo es de RD$200")
      .required("Debes ingresar el valor del costo de inscripción"),
    termsAndConditionsAccepted: Yup.bool()
      .oneOf([true], "Debes aceptar los Términos y Condiciones.")
      .default(false),
    privacyPolicyAccepted: Yup.bool()
      .oneOf([true], "Debes aceptar nuestra Política de Privacidad.")
      .default(false),
  }),
];

export function AffiliationForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  // const componentRef = useRef();
  // const [userDocumentId, setUserDocumentId] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema[step],
    onSubmit: async (values) => {
      if (step === steps.length - 2) {
        setLoading(true);
        const formFiles = new FormData();
        formFiles.append("files", values.documentIdFront);
        formFiles.append("files", values.documentIdBack);

        // console.log("AffiliationForm values: ", values);
        try {
          // upload files
          const fileResponse = await fileController.upload(formFiles);
          // console.log("fileResponse: ", fileResponse);
          if (fileResponse) {
            const documentIdFrontID = fileResponse[0].id;
            const documentIdBackID = fileResponse[1].id;

            try {
              let formDataValues = {
                ...values,
                documentIdFront: documentIdFrontID,
                documentIdBack: documentIdBackID,
              };
              const response = await affiliationController.submit(
                formDataValues
              );

              if (response) {
                if (typeof window.gtag === "function") {
                  window.gtag("event", "affiliation_form_convert", {
                    document_id: response.documentId,
                    email: response.email,
                    phone_number:
                      `+1${response.phone}` || `+1${response.mobile}`,
                    address: {
                      first_name: response.firstName,
                      last_name: response.lastName,
                      street: response.location.address,
                      city: response.location.city,
                      region: response.location.state,
                      postal_code: response.location.postalCode,
                      country: response.location.country,
                    },
                    gender:
                      response.gender === "M"
                        ? "Masculino"
                        : response.gender === "F"
                        ? "Femenino"
                        : "No Especificado",
                  });
                }
              }
              // console.log("Solicitud de afiliacion response: ", response);
            } catch (error) {
              console.error(error);
            }
          } else {
            console.log("Error al subir los archivos.");
          }
        } catch (error) {
          console.error("Error uploading files: ", error);
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setStep(5); // the final step
      } else {
        setStep(step + 1);
        // if (step > 0) {
        //   setUserDocumentId(values.documentId);
        // }
      }
    },
  });

  // const handleDownloadPDF = async () => {
  //   const input = componentRef.current;
  //   const canvas = await html2canvas(input);
  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "in",
  //     format: "letter",
  //   });
  //   pdf.addImage(imgData, "PNG", 0, 0);
  //   pdf.save(`${userDocumentId}-solicitud-afiliacion.pdf`);
  // };

  // const Preview = forwardRef(({ formik }, ref) => (
  //   <div ref={ref}>
  //     <p>Aqui ejemplo</p>
  //   </div>
  // ));

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} className={styles.affiliationForm}>
          {step === 0 && <StepOne {...formik} />}
          {step === 1 && <StepTwo {...formik} />}
          {step === 2 && <StepThree {...formik} />}
          {step === 3 && <StepFour {...formik} />}
          {step === 4 && <StepFive {...formik} />}
          {/* {step === 5 && <Preview formik={formik} ref={componentRef} />} */}
          {step === 5 && <StepFinal {...formik} />}
          <div className={styles.actions}>
            {step > 0 && step < steps.length - 1 && (
              <Button secondary type="button" onClick={() => setStep(step - 1)}>
                <Icon name="arrow left" />
                Volver atras
              </Button>
            )}

            {/* {step === steps.length - 1 && (
              <>
                <ReactToPrint
                  trigger={() => <Button type="button">Imprimir</Button>}
                  content={() => componentRef.current}
                />
                <Button type="button" onClick={handleDownloadPDF}>
                  Descargar PDF
                </Button>
              </>
            )} */}

            {step < steps.length - 1 && (
              <Button primary type="submit" loading={loading}>
                {step === steps.length - 2 ? (
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
            )}
          </div>
        </Form>
      </FormikProvider>
    </>
  );
}
