import * as Yup from 'yup';

export function initialValues(address) {
    return {
        address: address?.address || "",
        address2: address?.address2 || "",
        country: address?.country?.data.id || "",
        state: address?.state?.data.id || "",
        city: address?.city?.data.id || "",
        postalCode: address?.postalCode || ""
    }
}

export function validationSchema() {
    return Yup.object({
        address: Yup.string().required(true),
        address2: Yup.string(),
        country: Yup.number(),
        state: Yup.number(),
        city: Yup.number(),
        postalCode: Yup.string().required(true),
    })
}