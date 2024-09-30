import { useEffect, useState } from "react";
import { Form, FormGroup, FormInput } from "semantic-ui-react";
import styles from "./RegisterForm.module.scss";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { useFormik } from "formik";
import { Auth, Membership } from "@/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const authController = new Auth();
const membershipController = new Membership();

export function RegisterForm() {
  const router = useRouter();

  const [isMembershipValid, setIsMembershipValid] = useState(false);
  const [memberIdFromResponse, setMemberIdFromResponse] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      if (String(formValues.memberId) !== memberIdFromResponse) {
        toast.error(
          "Los datos ingresados no coinciden con nuestros registros."
        );
        formValues.username = "";
        formik.setFieldValue("username", "");
        formik.setFieldValue("memberId", "");
        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");
        formik.setFieldValue("firstName", "");
        formik.setFieldValue("lastName", "");
        return;
      }

      // console.log("FORM DATA: ", formValues);
      try {
        await authController.register(formValues);
        toast.success(
          `Registro completado con éxito. Por favor, inicia sesión.`
        );
        // console.log("OK");
        router.push("/auth/login");
      } catch (error) {
        if (error?.error?.details?.errors) {
          const serverErrors = error.error.details.errors;
          console.log("SERVER ERRORS: ", serverErrors);
          serverErrors?.forEach((err) => {
            formik.setFieldError(err.path.join("."), err.message);
            toast.error(`Error en ${err.path.join(".")}: ${err.message}`);
          });
        } else {
          switch (error.error.message) {
            case "Email or Username are already taken":
              toast.error(
                "Ya existe un usuario registrado con este correo o número de documento"
              );
              break;

            default:
              toast.error(`${error.error.message}`);
              break;
          }
          console.log("REGISTER ERROR: ", error);
        }
      }
    },
  });

  // check membership
  useEffect(() => {
    const fetchMembershipData = async () => {
      if (formik.values.username.length === 11) {
        const data = await membershipController.check(formik.values.username);
        // console.log("MEMBERSHIP DATA: ", data);
        if (data.isMember) {
          const stringMemberId = String(data.memberId);
          formik.setFieldValue("firstName", data.firstName || "");
          formik.setFieldValue("lastName", data.lastName || "");
          setIsMembershipValid(true);
          setMemberIdFromResponse(stringMemberId);
          // console.log("MEMBER ID: ", memberIdFromResponse);
        } else {
          formik.setFieldValue("username", "");
          formik.setFieldValue("firstName", "");
          formik.setFieldValue("lastName", "");
          setIsMembershipValid(false);
          toast.error(
            "No hemos encontrado datos con el número de cédula proporcionado. Por favor intente más tarde."
          );
        }
      }
    };
    fetchMembershipData();
  }, [formik.values.username]);

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.registerForm}>
      <FormGroup widths="equal">
        {/* numero de cedula */}
        <FormInput
          name="username"
          type="text"
          placeholder="Número de cedula"
          value={formik.values.username || ""}
          onChange={formik.handleChange}
          error={formik?.errors?.username}
        />
        <FormInput
          name="memberId"
          type="text"
          placeholder="Número de socio"
          value={formik.values.memberId || ""}
          disabled={!isMembershipValid}
          onChange={formik.handleChange}
          error={formik?.errors?.memberId}
        />
      </FormGroup>

      {/* correo */}
      <FormInput
        name="email"
        type="text"
        placeholder="Correo electrónico"
        value={formik.values.email}
        disabled={!isMembershipValid}
        onChange={formik.handleChange}
        error={formik?.errors?.email}
      />

      {/* password */}
      <FormInput
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        disabled={!isMembershipValid}
        onChange={formik.handleChange}
        error={formik?.errors?.password}
      />

      <FormInput
        name="firstName"
        type="text"
        placeholder="Nombre"
        value={formik.values.firstName}
        readOnly
        disabled={!isMembershipValid}
        onChange={formik.handleChange}
        error={formik?.errors?.firstName}
      />
      <FormInput
        name="lastName"
        type="text"
        placeholder="Apellidos"
        value={formik.values.lastName}
        readOnly
        disabled={!isMembershipValid}
        onChange={formik.handleChange}
        error={formik?.errors?.lastName}
      />

      <Form.Button
        type="submit"
        fluid
        loading={formik.isSubmitting}
        disabled={!isMembershipValid}
      >
        Regístrate Ahora
      </Form.Button>
    </Form>
  );
}
