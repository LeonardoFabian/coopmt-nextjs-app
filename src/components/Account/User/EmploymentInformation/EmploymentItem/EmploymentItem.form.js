import * as Yup from "yup";

// export function initialValues(
//   companyName,
//   sector,
//   department,
//   isCareerEmployee,
//   salary,
//   address,
//   phone,
//   employment_type,
//   address2,
//   city,
//   state,
//   country,
//   ext,
//   position,
//   startDate,
//   endDate
// ) {
//   return {
//     companyName: companyName || "",
//     sector: sector || 0,
//     department: department || "",
//     isCareerEmployee: isCareerEmployee || false,
//     salary: salary || 0,
//     address: address || "",
//     phone: phone || "",
//     employment_type: employment_type || 0,
//     address2: address2 || "",
//     city: city || "",
//     state: state || "",
//     country: country || "",
//     ext: ext || "",
//     position: position || "",
//     startDate: startDate || "",
//     endDate: endDate || "",
//   };
// }

export function validationSchema() {
  return Yup.object({
    companyName: Yup.string().required("El nombre de la empresa es requerido."),
    sector: Yup.number().required("El sector es requerido."),
    department: Yup.string().required("El departamento es requerido."),
    isCareerEmployee: Yup.boolean().required(
      "El tipo de vinculación es requerido."
    ),
    salary: Yup.number().required("El salario es requerido."),
    address: Yup.string().required("La dirección es requerida."),
    phone: Yup.string().required("El teléfono es requerido."),
    employment_type: Yup.number().required(
      "El tipo de vinculación es requerido."
    ),
    address2: Yup.string().nullable(),
    city: Yup.string().required("La ciudad es requerida."),
    state: Yup.string().required("El estado/provincia es requerido."),
    country: Yup.string().required("El país es requerido."),
    ext: Yup.string().nullable(),
    position: Yup.string().required("La posición es requerida."),
    startDate: Yup.string().required("La fecha de inicio es requerida."),
    endDate: Yup.string(),
  });
}
