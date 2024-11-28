import * as Yup from "yup";

export function initialValues(
  firstName,
  lastName,
  nickname,
  email,
  gender,
  birthdate,
  maritalStatus,
  hasChildren,
  childrens
) {
  return {
    firstName: firstName || "",
    lastName: lastName || "",
    nickname: nickname || "",
    email: email || "",
    gender: gender || 0,
    birthdate: birthdate || "",
    maritalStatus: maritalStatus || 0,
    hasChildren: hasChildren || false,
    childrens: childrens || 0,
  };
}

export function validationSchema() {
  return Yup.object({
    firstName: Yup.string().required(true),
    lastName: Yup.string().required(true),
    nickname: Yup.string().nullable(),
    email: Yup.string().email(true).required(true),
    gender: Yup.number().required(true),
    birthdate: Yup.string().required(true),
    maritalStatus: Yup.number().required(true),
    hasChildren: Yup.bool()
      .required("Debes seleccionar una opción")
      .default(false),
    childrens: Yup.number().min(0).integer(),
  });
}
