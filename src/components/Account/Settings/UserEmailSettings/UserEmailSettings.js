import { Form, Icon } from "semantic-ui-react";
import { initialValues, validationSchema } from "./UserEmailSettings.form";
import { useFormik } from "formik";
import { User } from "@/api";
import { useAuth } from "@/hooks";
import styles from "./UserEmailSettings.module.scss";

const userController = new User();

export function UserEmailSettings() {
  const { user, updateUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await userController.updateMe(user.id, { email: formValues.email });
        updateUser("email", formValues.email);
        formik.handleReset();
        // console.log(formValues);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2>Cambiar correo electrónico</h2>

      <Form.Input
        name="email"
        type="text"
        label="Correo electrónico"
        placeholder="Correo electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />

      <Form.Input
        name="repeatEmail"
        type="text"
        placeholder="Repetir correo electronico"
        value={formik.values.repeatEmail}
        onChange={formik.handleChange}
        error={formik.errors.repeatEmail}
      />

      <div className={styles.actions}>
        <Form.Button type="submit" loading={formik.isSubmitting}>
          <Icon name="save" /> Enviar
        </Form.Button>
      </div>
    </Form>
  );
}
