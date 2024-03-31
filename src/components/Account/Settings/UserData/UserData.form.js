import * as Yup from 'yup';

export function initialValues(documentId, birthdate, firstName, lastName, nickname, gender, maritalStatus, hasChildren, childrens) {
    return {
        documentId,
        birthdate,
        firstName,
        lastName,
        nickname,
        gender,
        maritalStatus,
        hasChildren,
        childrens: 1,
    };
}

export function validationSchema() {
    return Yup.object({
        documentId: Yup.string().required(true),
        birthdate: Yup.string().required(true),
        firstName: Yup.string().required(true),
        lastName: Yup.string().required(true),
        nickname: Yup.string().required(true),
        gender: Yup.string().required(true),
        maritalStatus: Yup.string().required(true),
        hasChildren: Yup.string().required(true),
        childrens: Yup.string().required(true),
    });
}