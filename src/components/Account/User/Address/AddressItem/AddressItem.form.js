import * as Yup from "yup";

export function initialValues(
  label,
  address1,
  address2,
  city,
  state,
  country,
  postalCode
) {
  return {
    label: label || "",
    address: address1 || "",
    address2: address2 || "",
    city: city || "",
    state: state || "",
    country: country || "",
    postalCode: postalCode || "",
  };
}

export function validationSchema() {
  return Yup.object({
    label: Yup.string().required(true),
    address: Yup.string().required(true),
    address2: Yup.string(),
    country: Yup.number(),
    state: Yup.number(),
    city: Yup.number(),
    postalCode: Yup.string(),
  });
}
