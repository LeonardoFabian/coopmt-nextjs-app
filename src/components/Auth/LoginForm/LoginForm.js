import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useAuth } from "@/hooks";
// import { useRouter } from "next/router";
import styles from "./LoginForm.module.scss";
import Link from "next/link";

const authController = new Auth();

export function LoginForm() {
  // const router = useRouter();
  const { login } = useAuth();

  if (!login) {
    return <div>Cargando...</div>;
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const response = await authController.login(formValues);
        if (response?.jwt) {
          login(response.jwt);
        }
        // console.log("LOGIN DATA: ", formValues);
        // console.log("LOGIN RESPONSE: ", response);
      } catch (error) {
        console.log("LOGIN ERROR: ", error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.loginForm}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electrónico o cédula sin guiones"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik?.errors?.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Ingrese su contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik?.errors?.password}
      />
      <div className={styles.forgotPasswordLink}>
        <Link href="/auth/forgot-password">¿Olvidaste tu contraseña?</Link>
      </div>
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Iniciar sesión
      </Form.Button>
    </Form>
  );
}
