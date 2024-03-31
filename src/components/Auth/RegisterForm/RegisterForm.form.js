import * as Yup from "yup";

export function initialValues() {
    return {
        documentId: "",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    }}

export function validationSchema(){
    return Yup.object({
        documentId: Yup.string().required(true),
        firstName: Yup.string().required(true),
        lastName: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
    });
}