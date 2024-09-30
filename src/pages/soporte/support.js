import styles from "./support.module.scss";
import { RootLayout } from "@/layouts";

import { useState, useEffect } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Shared } from "@/components/Shared";
import { Container } from "semantic-ui-react";

export default function SupportPage() {
  return (
    <>
      <Shared.Seo title="Ayuda y Soporte" />
      <RootLayout>
        <main className={styles.supportPage}>
          <Container isContainer>
            <h3>Ayuda y Soporte</h3>
          </Container>
        </main>
      </RootLayout>
    </>
  );
}
