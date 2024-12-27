import styles from "./CookieConsent.module.scss";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Shared } from "@/components/Shared";
import { Container } from "semantic-ui-react";
import Link from "next/link";
import { ENV } from "@/utils";

export function CookieConsent({
  content,
  isLoggedIn,
  onAccept,
  onReject,
  updateConsent,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get(`${ENV.COOKIE_CONSENT_NAME}`);
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.cookiePopup}>
      <Container isContainer>
        <p>
          Utilizamos cookies y herramientas similares para mejorar tu
          experiencia de navegación. Tambien podemos utilizar cookies para
          analizar el tráfico y mejorar nuestros servicios. Si aceptas, nos
          ayudas a comprender cómo los usuarios interactúan con nuestro sitio
          web (número de visitas, páginas visitadas, servicios utilizados, la
          ubicación geográfica, el dispositivo utilizado, etc). Si rechazas y
          luego cambias de opinión, puedes visitar nuestra página de{" "}
          <Link href="/pages/politica-de-cookies">Política de Cookies</Link>{" "}
          para aceptar el uso de cookies.
        </p>
        <Shared.CookieConsentOptions
          content={null}
          isLoggedIn={isLoggedIn}
          onAccept={onAccept}
          onReject={onReject}
          updateConsent={updateConsent}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </Container>
    </div>
  );
}
