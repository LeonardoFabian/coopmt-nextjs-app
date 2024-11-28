import * as Yup from "yup";

export function initialValues(
  documentID,
  firstname,
  lastname,
  email,
  birthDate,
  note,
  phone,
  mobile,
  relationship_type
) {
  return {
    documentID: documentID || "",
    firstname: firstname || "",
    lastname: lastname || "",
    email: email || "",
    birthDate: birthDate || null,
    note: note || "",
    phone: phone || "",
    mobile: mobile || "",
    relationship_type: relationship_type || 0,
  };
}

export function validationSchema() {
  return Yup.object({
    documentID: Yup.string()
      .matches(
        /^[0-9]{1,11}$/,
        "El número de cédula debe tener solo números y un máximo de 11 caracteres."
      )
      .min(11, "El número de cédula debe tener al menos 11 caracteres")
      .max(11, "El número de cédula debe tener un maximo de 11 caracteres")
      .nullable(),
    firstname: Yup.string().required("El nombre es requerido"),
    lastname: Yup.string().required("El apellido es requerido"),
    email: Yup.string(),
    birthDate: Yup.date().nullable(),
    note: Yup.string(),
    phone: Yup.string(),
    mobile: Yup.string(),
    relationship_type: Yup.number()
      .positive("El tipo de relacion es requerido")
      .required("El tipo de relacion es requerido"),
  });
}
