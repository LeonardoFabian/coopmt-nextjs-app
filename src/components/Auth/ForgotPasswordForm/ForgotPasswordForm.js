import styles from "./ForgotPasswordForm.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { initialValues, validationSchema } from "./ForgotPasswordForm.form";
import { toast } from "react-toastify";

const authController = new Auth();

export function ForgotPasswordForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      // console.log("Correo de recuperacion: ", formValues);
      try {
        const response = await authController.forgotPassword(formValues);
        // console.log("Response: ", response);
        if (response?.ok === true) {
          toast.success(
            "Correo enviado con éxito. Por favor, verifique su bandeja de entrada."
          );
        } else {
          toast.error("Error al enviar el correo.");
        }
      } catch (error) {
        console.error("Error sending email: ", error);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <Form.Input
          type="text"
          name="email"
          placeholder="Correo electrónico"
          value={formik?.values?.email}
          onChange={formik.handleChange}
          error={formik?.errors?.email}
        />
        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Enviar
        </Form.Button>
      </Form>
    </>
  );
}
