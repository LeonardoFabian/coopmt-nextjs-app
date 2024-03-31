import { Form } from "semantic-ui-react";
import styles from "./RegisterForm.module.scss";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { useRouter } from "next/router";

const authController = new Auth();

export function RegisterForm() {

    const router = useRouter();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            // console.log("FORM DATA: ", formValues);
            try {
                await authController.register(formValues);
                // console.log("OK");
                router.push("/auth/login");
            } catch (error) {
                console.log("REGISTER ERROR: ", error);
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input 
                    name="documentId"
                    type="text"
                    placeholder="Cédula de identidad"
                    value={formik.values.documentId}
                    onChange={formik.handleChange}
                    error={formik.errors.documentId}
                />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input 
                    name="firstName" 
                    type="text" 
                    placeholder="Nombre" 
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.errors.firstName}
                />
                <Form.Input 
                    name="lastName" 
                    type="text" 
                    placeholder="Apellidos" 
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.errors.lastName}
                />                
            </Form.Group>

            <Form.Input 
                name="email" 
                type="text" 
                placeholder="Correo electrónico" 
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />

            <Form.Group widths="equal">
                <Form.Input 
                    name="username" 
                    type="text" 
                    placeholder="Nombre de usuario" 
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                />
                <Form.Input 
                    name="password" 
                    type="password" 
                    placeholder="Contraseña" 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
            </Form.Group>

            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Registrar
            </Form.Button>
        </Form>
    )
}
