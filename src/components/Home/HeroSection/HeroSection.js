import styles from "./HeroSection.module.scss";
import Link from "next/link";
import { Container, Button } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";

export function HeroSection({ block }) {
  //   const { heading, subheading, image, link } = block;
  const { slides } = block;

  if (!block) return null;

  return (
    <Container fluid className={styles.heroSection}>
      <>
        {
          <Custom.EmblaCarousel slides={slides?.data} />

          /* <Shared.Image
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
      </Container> */
        }
      </>
    </Container>
  );
}
