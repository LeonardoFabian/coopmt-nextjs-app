import * as Yup from "yup";

export function initialValues(bank, currency, type, number, label) {
  return {
    bank: bank || 0,
    currency: currency || null,
    type: type || 0,
    number: number || null,
    label: label || null,
  };
}

export function validationSchema() {
  return Yup.object({
    bank: Yup.number(),
    currency: Yup.number(),
    type: Yup.number(),
    number: Yup.string().required(),
    label: Yup.string(),
  });
}
