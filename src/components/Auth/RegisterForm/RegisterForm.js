import { Form, FormGroup, FormInput } from "semantic-ui-react";
import styles from "./RegisterForm.module.scss";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { useRouter } from "next/router";

const authController = new Auth();

export function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      // console.log("FORM DATA: ", formValues);
      try {
        await authController.register(formValues);
        // console.log("OK");
        router.push("/auth/login");
      } catch (error) {
        console.log("REGISTER ERROR: ", error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.registerForm}>
      <Form.Input
        name="documentId"
        type="text"
        placeholder="Cédula de identidad"
        value={formik.values.documentId}
        onChange={formik.handleChange}
        error={formik.errors.documentId}
      />

      <FormGroup widths="equal">
        <FormInput
          name="firstName"
          type="text"
          placeholder="Nombre"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
        />
        <FormInput
          name="lastName"
          type="text"
          placeholder="Apellidos"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName}
        />
      </FormGroup>

      <FormInput
        name="email"
        type="text"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />

      <FormGroup widths="equal">
        <FormInput
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </FormGroup>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrar
      </Form.Button>
    </Form>
  );
}
