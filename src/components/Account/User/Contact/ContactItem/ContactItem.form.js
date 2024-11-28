import * as Yup from "yup";

export function initialValues(label, number, ext) {
  return {
    label: label || "",
    number: number || "",
    ext: ext || "",
  };
}

export function validationSchema() {
  return Yup.object({
    label: Yup.string().required(true),
    number: Yup.string().required(true),
    ext: Yup.string(),
  });
}
