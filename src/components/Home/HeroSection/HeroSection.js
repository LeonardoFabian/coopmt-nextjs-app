import styles from "./HeroSection.module.scss";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import { Shared } from "@/components/Shared";

export function HeroSection({ data }) {
  const { heading, subheading, image, link } = data;

  if (!data) return null;

  return (
    <Container fluid className={styles.heroSection}>
      <Shared.Image
        src={image.url}
        alt="Background"
        className={styles.background}
      />
      <Container isContainer className={styles.wrapper}>
        <div className={styles.content}>
          <h1>{heading}</h1>
          <h5>{subheading}</h5>
          <Link href={link.url}>
            <Button primary>{link.label}</Button>
          </Link>
        </div>
      </Container>
    </Container>
  );
}
