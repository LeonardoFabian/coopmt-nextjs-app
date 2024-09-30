// import React from "react";
import styles from "./login.module.scss";
import { AuthLayout } from "@/layouts/AuthLayout";
import Link from "next/link";
import { LoginForm } from "@/components/Auth";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import { Option } from "@/api";
import { useEffect, useState } from "react";

const optionController = new Option();

export default function Login() {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
        // console.log("Preview options response: ", response);
        setOptions(response.data);
      } catch (error) {
        console.error("Options request error: ", error);
      }
    })();
  }, []);

  const logoUrl =
    options?.attributes?.logo?.data?.attributes?.url ?? "/images/logo.svg";
  const logoAlt =
    options?.attributes?.logo?.data?.attributes?.alternativeText ?? "Logo";

  return (
    <>
      <Shared.Seo title="Inicia sesión" />
      <AuthLayout>
        <div className={styles.login}>
          {/* logo */}
          <Link href="/">
            <Shared.Image src={logoUrl} alt={logoAlt} fill />
          </Link>
          <div className={styles.content}>
            <h3>Inicia sesión</h3>
            <LoginForm />
            <div className={styles.actions}>
              ¿No tienes cuenta? <Link href="/auth/register">Regístrate</Link>
            </div>
          </div>
          {/* support link */}
          {options?.attributes?.supportPhone ? (
            <a
              href={`https://wa.me/1${options.attributes.supportPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportLink}
            >
              <Block.MaterialIcon icon="headset_mic" height="20px" /> Soporte
            </a>
          ) : (
            <p>{new Date().getFullYear()}. Todos los derechos reservados.</p>
          )}
        </div>
      </AuthLayout>
    </>
  );
}
