import * as Yup from "yup";

export function initialValues() {
  return {
    // documentId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    memberId: "",
    password: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
    receiveNotifications: false,
  };
}

// RegisterForm validations
export function validationSchema(formik) {
  return Yup.object({
    firstName: Yup.string().required(true),
    lastName: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    username: Yup.string()
      .matches(
        /^[0-9]{1,11}$/,
        "El número de cédula debe tener solo números y un máximo de 11 caracteres."
      )
      .min(11, "El número de cédula debe tener al menos 11 caracteres")
      .max(11, "El número de cédula debe tener un maximo de 11 caracteres")
      .required(true),
    memberId: Yup.string().required(true),
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
  });
}
