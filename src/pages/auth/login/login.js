import React from 'react';
import styles from './login.module.scss';
import { AuthLayout } from '@/layouts/AuthLayout';
import Link from 'next/link';
import { LoginForm } from '@/components/Auth';

export default function Login() {
    return (
        <>
            <AuthLayout>
                <div className={styles.login}>
                    <h3>Inicia sesión</h3>
                    <LoginForm />
                    <div className={styles.actions}>
                        ¿No tienes cuenta? <Link href="/auth/register">Regístrate</Link>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}
