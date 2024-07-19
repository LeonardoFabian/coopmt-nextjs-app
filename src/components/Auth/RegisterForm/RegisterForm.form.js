import * as Yup from "yup";

export function initialValues() {
  return {
    documentId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    documentId: Yup.string()
      .min(11, "El número de cédula debe tener al menos 11 caracteres")
      .max(11, "El número de cédula debe tener un maximo de 11 caracteres")
      .required(true),
    firstName: Yup.string().required(true),
    lastName: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string()
      .min(6, "La contraseña debe tener mínimo 6 caracteres")
      .required(true),
  });
}
