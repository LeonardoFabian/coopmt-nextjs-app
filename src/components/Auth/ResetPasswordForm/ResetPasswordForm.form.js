import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    passwordConfirmation: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required(),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], true),
  });
}
