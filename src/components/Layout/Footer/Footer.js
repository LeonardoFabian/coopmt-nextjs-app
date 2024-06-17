import styles from "./Footer.module.scss";
import Link from "next/link";
import { Container, Button, Icon } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { BottomBar } from "../BottomBar";

export function Footer(props) {
  const { data } = props;

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.columns}>
          <div className={styles.logo}>
            <Shared.Logo
              image={data?.logo}
              text={data?.siteTitle}
              link={data?.logoUrl}
            />
          </div>

          <div className={styles.about}>
            <h5 className={styles.heading}>Cooperativa</h5>
            <ul className={styles.aboutList}>
              <Link href="#">Sobre nosotros</Link>
              <Link href="#">Términos y condiciones</Link>
              <Link href="#">Política de privacidad</Link>
              <Link href="#">FAQs</Link>
            </ul>
          </div>

          <div className={styles.tools}>
            <h5 className={styles.heading}>Herramientas</h5>
            <ul className={styles.toolsList}>
              <Link href="#">Cálculadora de préstamos</Link>
            </ul>
          </div>

          <div className={styles.contactInfo}>
            <h5 className={styles.heading}>Contáctanos</h5>
            <ul className={styles.aboutList}>
              <Link href="#">Dirección</Link>
              <Link href="#">Télefono</Link>
              <Link href="#">Correo</Link>
              <Link href="#">Horarios</Link>
              <div className={styles.contactSubmenu}>
                <h5 className={styles.heading}>Síguenos en</h5>
                <ul className={styles.social}>
                  <Button
                    as="a"
                    href="#"
                    circular
                    color="facebook"
                    icon="facebook"
                  />
                  <Button
                    as="a"
                    href="#"
                    circular
                    color="instagram"
                    icon="instagram"
                  />
                  <Button
                    as="a"
                    href="#"
                    circular
                    color="twitter"
                    icon="twitter"
                  />
                  <Button
                    as="a"
                    href="#"
                    circular
                    color="youtube"
                    icon="youtube"
                  />
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </Container>

      <BottomBar copyright={data?.copyright} />
    </footer>
  );
}
