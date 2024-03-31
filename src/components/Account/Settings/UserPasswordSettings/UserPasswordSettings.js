import styles from './UserPasswordSettings.module.scss';
import { Form, Icon } from 'semantic-ui-react';
import { initialValues, validationSchema } from './UserPasswordSettings.form';
import { useFormik } from 'formik';
import { User } from '@/api';
import { useAuth } from '@/hooks';

const userController = new User();

export function UserPasswordSettings() {

    const { user, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                await userController.updateMe(user.id, { password: formValues.password });
                logout();
                // console.log(formValues);
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
            <h2>Cambiar la contraseña</h2>

            <Form.Input
                name="password"
                type='password'
                label="Contraseña"
                placeholder='Ingresa la nueva contraseña'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <Form.Input
                name="repeatPassword"
                type='password'
                placeholder='Ingresa nuevamente la contraseña anterior'
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatPassword}
            />

            <div className={styles.actions}>
                <Form.Button type='submit' loading={formik.isSubmitting}>
                    <Icon name="save" /> Enviar
                </Form.Button>  
            </div>  
        </Form>
    )
}
