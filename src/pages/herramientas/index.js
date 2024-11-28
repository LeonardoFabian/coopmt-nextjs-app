import Link from "next/link";
import styles from "./herramientas.module.scss";
import { Block } from "@/components/Block";
import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";

export default function ToolsPage() {
  return (
    <RootLayout>
      <div className={styles.toolsPage}>
        <div className={styles.header}>
          <Container isContainer>
            <h2 className={styles.title}>Herramientas Financieras</h2>
            <p>
              Explora nuestras herramientas para ayudarte a gestionar tus
              finanzas:
            </p>
          </Container>
        </div>

        <Container isContainer>
          <ul className={styles.toolsList}>
            <li>
              <Link href="/herramientas/calculadora-de-prestamos">
                <span className={styles.icon}>
                  <Block.MaterialIcon icon="calculate" height="64px" />
                </span>
                <h6 className={styles.title}>Calculadora de Préstamos</h6>
              </Link>
            </li>
            <li>
              <Link href="/herramientas/simulador-de-prestamos">
                <span className={styles.icon}>
                  <Block.MaterialIcon icon="request_quote" height="64px" />
                </span>
                <h6 className={styles.title}>Simulador de Préstamos</h6>
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </RootLayout>
  );
}
