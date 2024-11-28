import * as Yup from "yup";

export function initialValues(firstName, lastName) {
  return {
    firstName,
    lastName,
  };
}

export function validationSchema() {
  return Yup.object({
    firstName: Yup.string().required(true),
    lastName: Yup.string().required(true),
  });
}
