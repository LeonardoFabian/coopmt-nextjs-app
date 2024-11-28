import * as Yup from "yup";

export function initialValues(
  firstName,
  lastName,
  phone,
  mobile,
  nickname,
  documentId,
  email,
  address,
  address2,
  city,
  state,
  country,
  relationship_type
) {
  return {
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phone || "",
    mobile: mobile || "",
    nickname: nickname || "",
    documentId: documentId || "",
    email: email || "",
    address: address || "",
    address2: address2 || "",
    city: city || "",
    state: state || "",
    country: country || "",
    relationship_type: relationship_type || 0,
  };
}

export function validationSchema() {
  return Yup.object({
    firstName: Yup.string().required("El nombre es requerido"),
    lastName: Yup.string().required("El apellido es requerido"),
    phone: Yup.string(),
    mobile: Yup.string(),
    nickname: Yup.string(),
    documentId: Yup.string(),
    email: Yup.string(),
    address: Yup.string().required("El domicilio es requerido"),
    address2: Yup.string(),
    city: Yup.string().required("La ciudad es requerida"),
    state: Yup.string().required("El estado/provincia es requerido"),
    country: Yup.string().required("El país es requerido"),
    relationship_type: Yup.number()
      .positive("El tipo de relacion es requerido")
      .required("El tipo de relacion es requerido"),
  });
}
