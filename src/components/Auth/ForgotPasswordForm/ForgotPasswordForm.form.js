import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Formato de correo invalido.")
      .required(
        "Es necesario ingresar el correo electrónico con el que te habías registrado anteriormente."
      ),
  });
}
