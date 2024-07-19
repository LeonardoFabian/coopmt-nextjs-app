import React from "react";
import styles from "./register.module.scss";
import { AuthLayout } from "@/layouts/AuthLayout";
import Link from "next/link";
import { RegisterForm } from "@/components/Auth";
import { Shared } from "@/components/Shared";

export default function Register() {
  return (
    <>
      <Shared.Seo title="Regístrate" />
      <AuthLayout>
        <div className={styles.register}>
          <h6 className={styles.heading}>
            <strong>Regístrate</strong>
          </h6>
          <RegisterForm />
          <div className={styles.actions}>
            ¿Ya tienes una cuenta? <Link href="/auth/login">Inicia sesión</Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
