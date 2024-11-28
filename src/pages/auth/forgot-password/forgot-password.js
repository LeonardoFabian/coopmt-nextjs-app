import styles from "./forgot-password.module.scss";
import { EmptyLayout } from "@/layouts";
import Link from "next/link";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import { Option } from "@/api";
import { useEffect, useState } from "react";
import { ForgotPasswordForm } from "@/components/Auth";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

const optionController = new Option();

export default function ForgotPassword() {
  const [options, setOptions] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.back();
    } else {
      (async () => {
        try {
          const response = await optionController.getAll();
          console.log("Preview options response: ", response);
          setOptions(response.data);
        } catch (error) {
          console.error("Options request error: ", error);
        }
      })();
    }
  }, [user]);

  const logoUrl =
    options?.attributes?.logo?.data?.attributes?.url ?? "/images/logo.svg";
  const logoAlt =
    options?.attributes?.logo?.data?.attributes?.alternativeText ?? "Logo";

  return (
    <>
      {!user && (
        <>
          <Shared.Seo title="Recuperar Contraseña" />
          <EmptyLayout>
            <div className={styles.forgotPassword}>
              {/* logo */}
              <Link href="/">
                <Shared.Image src={logoUrl} alt={logoAlt} fill />
              </Link>
              <div className={styles.content}>
                <>
                  <h6 className={styles.heading}>
                    <strong>Recuperar Contraseña</strong>
                  </h6>
                  <p>
                    Ingresa el correo electrónico con el que te registraste
                    anteriormente para recuperar su contraseña.
                  </p>
                  <ForgotPasswordForm />
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
                  <Block.MaterialIcon icon="headset_mic" height="20px" />{" "}
                  Soporte
                </a>
              ) : (
                <p>
                  {new Date().getFullYear()}. Todos los derechos reservados.
                </p>
              )}
            </div>
          </EmptyLayout>
        </>
      )}
    </>
  );
}
