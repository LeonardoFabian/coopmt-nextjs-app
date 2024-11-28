// import React from "react";
import styles from "./register.module.scss";
import { AuthLayout } from "@/layouts/AuthLayout";
import Link from "next/link";
import { RegisterForm } from "@/components/Auth";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import { Button } from "semantic-ui-react";

import { Option } from "@/api";
import { useEffect, useState } from "react";

const optionController = new Option();

export default function Register() {
  const [options, setOptions] = useState(null);
  const [isMember, setIsMember] = useState(true);

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
      <Shared.Seo title="Regístrate" />
      <AuthLayout>
        <div className={styles.register}>
          {/* logo */}
          <Link href="/">
            <Shared.Image src={logoUrl} alt={logoAlt} fill />
          </Link>
          <div className={styles.content}>
            {isMember ? (
              <>
                <h6 className={styles.heading}>
                  <strong>Regístrate</strong>
                </h6>
                <RegisterForm />
                <div className={styles.actions}>
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/auth/login">Inicia sesión</Link>
                </div>
              </>
            ) : (
              <>
                <div className={styles.actions}>
                  <Link href="/affiliation" className={styles.affiliateLink}>
                    Afiliate ahora!
                  </Link>
                </div>
              </>
            )}
          </div>
          {/* support link */}
          {options?.attributes?.supportPhone ? (
            <a
              href={`https://wa.me/1${options?.attributes?.supportPhone}`}
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
