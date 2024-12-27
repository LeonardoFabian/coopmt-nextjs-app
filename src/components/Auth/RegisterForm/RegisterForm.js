import { useEffect, useState } from "react";
// import { Form, FormGroup, FormInput } from "semantic-ui-react";
import { FormGroup, Button } from "semantic-ui-react";
import styles from "./RegisterForm.module.scss";
// import { initialValues, validationSchema } from "./RegisterForm.form";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Auth, Membership, Gender, Phone, MaritalStatus } from "@/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import * as Yup from "yup";

const authController = new Auth();
const membershipController = new Membership();
const genderController = new Gender();
const phoneController = new Phone();
const maritalStatusController = new MaritalStatus();

export function RegisterForm() {
  const router = useRouter();

  const [isMembershipValid, setIsMembershipValid] = useState(false);
  const [memberIdFromResponse, setMemberIdFromResponse] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [genders, setGenders] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const gendersResponse = await genderController.getAll();
        // console.log("Genders: ", gendersResponse);
        setGenders(gendersResponse);

        const maritalStatusResponse = await maritalStatusController.find();
        // console.log("maritalStatusResponse: ", maritalStatusResponse);
        setMaritalStatus(maritalStatusResponse);
      } catch (error) {
        console.log("Error getting genders: ", error);
      }
    })();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          memberId: "",
          password: "",
          termsAccepted: false,
          privacyPolicyAccepted: false,
          receiveNotifications: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Nombre es obligatorio"),
          lastName: Yup.string().required("Apellidos son obligatorios"),
          email: Yup.string()
            .email("Debe ser un correo válido")
            .required("Correo es obligatorio"),
          username: Yup.string()
            .matches(
              /^[0-9]{1,11}$/,
              "El número de cédula debe tener solo números y un máximo de 11 caracteres."
            )
            .min(11, "El número de cédula debe tener al menos 11 caracteres")
            .max(
              11,
              "El número de cédula debe tener un maximo de 11 caracteres"
            )
            .required("Cédula es obligatoria"),
          memberId: Yup.string().required("Número de socio es obligatorio"),
          password: Yup.string()
            .min(6, "La contraseña debe tener mínimo 6 caracteres")
            .required("La contraseña es obligatoria"),
          termsAccepted: Yup.boolean()
            .oneOf([true], "Debe aceptar los Términos y Condiciones.")
            .required(),
          privacyPolicyAccepted: Yup.boolean()
            .oneOf([true], "Debe aceptar la Política de Privacidad.")
            .required(),
          receiveNotifications: Yup.boolean()
            .oneOf([true], "Debe aceptar recibir notificaciones.")
            .required(),
        })}
        validateOnChange={true}
        onSubmit={async (formValues, { setFieldError, resetForm }) => {
          // console.log("FORM VALUES: ", formValues);

          // if (!formValues.termsAccepted || !formValues.privacyPolicyAccepted) {
          //   toast.error(
          //     "Debe aceptar los términos y condiciones y la política de privacidad."
          //   );

          //   return;
          // }

          if (String(formValues.memberId) !== memberIdFromResponse) {
            toast.error(
              "Los datos ingresados no coinciden con nuestros registros."
            );
            resetForm();
            // formValues.username = "";
            // formik.setFieldValue("username", "");
            // formik.setFieldValue("memberId", "");
            // formik.setFieldValue("email", "");
            // formik.setFieldValue("password", "");
            // formik.setFieldValue("firstName", "");
            // formik.setFieldValue("lastName", "");
            return;
          }

          const currentDate = new Date().toISOString();

          const tempFormValues = {
            ...formValues,
            termsAcceptedAt: formValues.termsAccepted ? currentDate : null,
            privacyPolicyAcceptedAt: formValues.privacyPolicyAccepted
              ? currentDate
              : null,
          };

          // validar y asignar el genero desde genders
          if (genders && memberData?.gender) {
            const genderName = memberData.gender.toLowerCase();
            const genderMatch = genders.data.find(
              (gender) => gender.attributes.name.toLowerCase() === genderName
            );

            if (genderMatch) {
              tempFormValues.gender = genderMatch.id;
            } else {
              // Si no coincide con "masculino" o "femenino", usar "no especificado"
              const defaultGender = genders.data.find(
                (gender) =>
                  gender.attributes.name.toLowerCase() === "no especificado"
              );
              tempFormValues.gender = defaultGender?.id;
            }
          }

          // validar y asignar el estado civil desde maritalStatus
          if (maritalStatus && memberData?.maritalStatus) {
            const maritalStatusName = memberData.maritalStatus.toLowerCase();
            const maritalStatusMatch = maritalStatus.data.find(
              (maritalStatus) =>
                maritalStatus.attributes.label.toLowerCase() ===
                `${maritalStatusName}(a)`
            );

            if (maritalStatusMatch) {
              tempFormValues.maritalStatus = maritalStatusMatch.id;
            }
          }

          // console.log("FORM DATA: ", formValues);

          try {
            const response = await authController.register(tempFormValues);
            // console.log("REGISTER RESPONSE: ", response);

            // crear telefono
            if (memberData?.phone) {
              const phoneNumber = memberData.phone.replace(/-/g, "");
              const phoneLabel = memberData.phone ? "Teléfono" : "Celular";
              const phoneType = memberData.mobile ? "movil" : "telefono";

              const phoneData = {
                label: phoneLabel,
                number: phoneNumber,
                type: phoneType,
                user: response.user.id,
              };

              try {
                await phoneController.createFromRegistration(phoneData);
                // console.log("Teléfono creado");
              } catch (error) {
                console.error("PHONE ERROR: ", error);
              }
            }

            // Enviar datos a Google Analytics
            if (typeof window.gtag === "function") {
              window.gtag("set", "user_data", {
                email: formValues.email,
                phone_number: memberData.phone
                  ? `+1${memberData.phone.replace(/-/g, "")}`
                  : `+1${memberData.mobile.replace(/-/g, "")}`,
                address: {
                  first_name: formValues.firstName,
                  last_name: formValues.lastName,
                  street: `${memberData.address}, ${memberData.address2}`,
                },
              });

              window.gtag("event", "sign_up", {
                method: "email",
                user_id: response.user.id,
              });
            }

            toast.success(
              `Registro completado con éxito. Por favor, inicia sesión.`
            );
            // console.log("OK");
            router.push("/auth/login");
          } catch (error) {
            console.error("REGISTER ERROR: ", error);
            if (error?.error?.details?.errors) {
              error.error.details.errors.forEach((err) => {
                setFieldError(err.path.join("."), err.message);
              });
              // const serverErrors = error.error.details.errors;
              // console.log("SERVER ERRORS: ", serverErrors);
              // serverErrors?.forEach((err) => {
              //   formik.setFieldError(err.path.join("."), err.message);
              //   toast.error(`Error en ${err.path.join(".")}: ${err.message}`);
              // });
            }
            toast.error(error.error.message || "Error durante el registro.");

            // else {
            //   switch (error.error.message) {
            //     case "Email or Username are already taken":
            //       toast.error(
            //         "Ya existe un usuario registrado con este correo o número de documento"
            //       );
            //       break;

            //     default:
            //       toast.error(`${error.error.message}`);
            //       break;
            //   }
            //   console.log("REGISTER ERROR: ", error);
            // }
          }
        }}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          handleReset,
          handleSubmit,
          isSubmitting,
          setFieldError,
        }) => {
          // check membership
          useEffect(() => {
            const fetchMembershipData = async () => {
              if (values?.username?.length === 11) {
                try {
                  const data = await membershipController.check(
                    values.username
                  );
                  {
                    /* console.log("MEMBERSHIP DATA: ", data); */
                  }
                  setMemberData(data);

                  if (data.isMember) {
                    const stringMemberId = String(data.memberId);
                    setFieldValue("firstName", data.firstName || "");
                    setFieldValue("lastName", data.lastName || "");
                    setIsMembershipValid(true);
                    setMemberIdFromResponse(stringMemberId);
                    // console.log("MEMBER ID: ", memberIdFromResponse);
                  } else {
                    setIsMembershipValid(false);

                    {
                      /* formik.resetForm(); */
                    }
                    toast.error(
                      "No hemos encontrado datos con el número de cédula proporcionado. Por favor intente más tarde."
                    );

                    setFieldValue("username", "");
                    setFieldValue("firstName", "");
                    setFieldValue("lastName", "");
                  }
                } catch (error) {
                  console.error("Error verificando membresía: ", error);
                  toast.error(
                    "Error al verificar membresía. Intente más tarde."
                  );
                }
              }
            };
            fetchMembershipData();
          }, [values?.username, setFieldValue]);

          return (
            <Form onSubmit={handleSubmit} className={styles.registerForm}>
              <div className={styles.fields}>
                {/* numero de cedula */}
                <div className={styles.field}>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Número de cedula"
                    value={values?.username}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="username"
                    component="span"
                    className={styles.customError}
                  />
                </div>

                {/* numero de socio */}

                <div className={styles.field}>
                  <Field
                    name="memberId"
                    type="text"
                    disabled={!isMembershipValid}
                    value={values?.memberId}
                    onChange={handleChange}
                    placeholder="Número de socio"
                    className={styles.memberId}
                  />
                  <ErrorMessage
                    name="memberId"
                    component="span"
                    className={styles.customError}
                  />
                </div>
              </div>

              {/* correo */}

              <div className={styles.field}>
                <Field
                  name="email"
                  type="email"
                  disabled={!isMembershipValid}
                  value={values?.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={styles.customError}
                />
              </div>

              <div className={styles.field}>
                <Field
                  name="password"
                  type="password"
                  disabled={!isMembershipValid}
                  value={values?.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  autoComplete="new-password"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={styles.customError}
                />
              </div>

              <div className={styles.fields}>
                <div className={styles.field}>
                  <Field
                    name="firstName"
                    type="text"
                    disabled={!isMembershipValid}
                    value={values?.firstName}
                    onChange={handleChange}
                    placeholder="Nombre"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className={styles.customError}
                  />
                </div>

                <div className={styles.field}>
                  <Field
                    name="lastName"
                    type="text"
                    disabled={!isMembershipValid}
                    value={values?.lastName}
                    onChange={handleChange}
                    placeholder="Apellidos"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    className={styles.customError}
                  />
                </div>
              </div>

              {/* <FormInput
        name="firstName"
        type="text"
        placeholder="Nombre"
        value={formik.values.firstName}
        readOnly
        disabled={!isMembershipValid}
        onChange={formik.handleChange}
        error={
          formik?.errors?.firstName
            ? { content: formik.errors.firstName }
            : null
        }
      />
      <FormInput
        name="lastName"
        type="text"
        placeholder="Apellidos"
        value={formik.values.lastName}
        readOnly
        disabled={!isMembershipValid}
        onChange={formik.handleChange}
        error={
          formik?.errors?.lastName ? { content: formik.errors.lastName } : null
        }
      /> */}

              <div className={styles.terms}>
                <label>
                  <input
                    name="termsAccepted"
                    type="checkbox"
                    onChange={handleChange}
                    checked={values?.termsAccepted}
                  />
                  He leido y acepto los{" "}
                  <Link href="/pages/terminos-y-condiciones" target="_blank">
                    Términos y Condiciones.
                  </Link>
                </label>
                <ErrorMessage
                  name="termsAccepted"
                  component="span"
                  className={styles.customError}
                />

                <label>
                  <input
                    name="privacyPolicyAccepted"
                    type="checkbox"
                    onChange={handleChange}
                    checked={values?.privacyPolicyAccepted}
                  />
                  He leido y acepto la{" "}
                  <Link href="/pages/politica-de-privacidad" target="_blank">
                    Política de Privacidad.
                  </Link>
                </label>
                <ErrorMessage
                  name="privacyPolicyAccepted"
                  component="span"
                  className={styles.customError}
                />

                <label>
                  <input
                    name="receiveNotifications"
                    type="checkbox"
                    onChange={handleChange}
                    checked={values?.receiveNotifications}
                  />
                  Acepto recibir notificaciones por correo electrónico.
                </label>
                <ErrorMessage
                  name="receiveNotifications"
                  component="span"
                  className={styles.customError}
                />
              </div>

              <Button
                type="submit"
                primary
                fluid
                loading={isSubmitting}
                disabled={!isMembershipValid}
              >
                Regístrate Ahora
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
