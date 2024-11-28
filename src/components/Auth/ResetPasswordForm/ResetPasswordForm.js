import styles from "./ResetPasswordForm.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { initialValues, validationSchema } from "./ResetPasswordForm.form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";

const authController = new Auth();

export function ResetPasswordForm() {
  const router = useRouter();
  const { code } = router.query;
  const { login, user } = useAuth();

  if (user) {
    router.back();
    return null;
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log("Nueva contraseña: ", formValues);
      if (!code) return toast.error("Token invalido.");

      try {
        const response = await authController.resetPassword(formValues, code);
        console.log("Response: ", response);
        if (response?.jwt) {
          toast.success("Su contraseña se ha actualizado con éxito.");
          login(response.jwt);
        }
      } catch (error) {
        toast.error("Error al actualizar la contraseña.");
        console.error("Error al actualizar la contraseña: ", error);
      }
    },
  });

  return (
    <>
      {!user && (
        <>
          <Form onSubmit={formik.handleSubmit} className={styles.form}>
            <Form.Input
              type="password"
              name="password"
              label="Nueva contraseña"
              placeholder="Ingrese su nueva contraseña"
              value={formik?.values?.password}
              onChange={formik.handleChange}
              error={formik?.errors?.password}
            />
            <Form.Input
              type="password"
              name="passwordConfirmation"
              label="Confirmar contraseña"
              placeholder="Repite la contraseña que has ingresado"
              value={formik?.values?.passwordConfirmation}
              onChange={formik.handleChange}
              error={formik?.errors?.passwordConfirmation}
            />
            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
              Actualizar
            </Form.Button>
          </Form>
        </>
      )}
    </>
  );
}
