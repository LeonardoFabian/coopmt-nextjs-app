// import React from "react";
import styles from "./login.module.scss";
import { AuthLayout } from "@/layouts/AuthLayout";
import Link from "next/link";
import { LoginForm } from "@/components/Auth";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import { Option } from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

const optionController = new Option();

export default function Login() {
  const { user } = useAuth();
  const [options, setOptions] = useState({});
  const router = useRouter();
  // const [isMember, setIsMember] = useState(true);

  // if (user) {
  //   router.push("/");
  //   return null;
  // }

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const response = await optionController.getAll();
          // console.log("Preview options response: ", response);
          setOptions(response);
        } catch (error) {
          console.error("Options request error: ", error);
        }
      })();
    }
  }, [user]);

  const logoUrl =
    options?.data?.attributes?.logo?.data?.attributes?.url ??
    "/images/logo.svg";
  const logoAlt =
    options?.data?.attributes?.logo?.data?.attributes?.alternativeText ??
    "Logo";

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
            <p>¿Ya eres socio?</p>
            <h3>Inicia sesión</h3>
            <LoginForm />
            <div className={styles.actions}>
              ¿No tienes cuenta? <Link href="/auth/register">Regístrate</Link>
            </div>
            <Shared.Separator height={30} />
            <div className={styles.actions}>
              <p>¿Todavía no eres socio?</p>

              <Link href="/affiliation" className={styles.affiliateLink}>
                ¡Afiliate ahora!
              </Link>
            </div>
          </div>
          {/* support link */}
          {options?.data &&
            (options?.data?.attributes?.supportPhone ? (
              <a
                href={`https://wa.me/1${options?.data?.attributes?.supportPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.supportLink}
              >
                <Block.MaterialIcon icon="headset_mic" height="20px" /> Soporte
              </a>
            ) : (
              <p>{new Date().getFullYear()}. Todos los derechos reservados.</p>
            ))}
        </div>
      </AuthLayout>
    </>
  );
}
