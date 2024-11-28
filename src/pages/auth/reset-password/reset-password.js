import styles from "./reset-password.module.scss";
import { EmptyLayout } from "@/layouts";
import Link from "next/link";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import { Option } from "@/api";
import { useEffect, useState } from "react";
import { ResetPasswordForm } from "@/components/Auth";

const optionController = new Option();

export default function ResetPassword() {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
        console.log("Preview options response: ", response);
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
      <Shared.Seo title="Nueva Contraseña" />
      <EmptyLayout>
        <div className={styles.resetPassword}>
          {/* logo */}
          <Link href="/">
            <Shared.Image src={logoUrl} alt={logoAlt} fill />
          </Link>
          <div className={styles.content}>
            <>
              <h6 className={styles.heading}>
                <strong>Nueva Contraseña</strong>
              </h6>
              <ResetPasswordForm />
              <div className={styles.actions}>
                ¿Recordaste tu contraseña?{" "}
                <Link href="/auth/login">Inicia sesión</Link>
              </div>
            </>
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
      </EmptyLayout>
    </>
  );
}
