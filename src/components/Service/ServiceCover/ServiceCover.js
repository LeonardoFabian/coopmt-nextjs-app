import styles from "./ServiceCover.module.scss";
import { Container, Button, Icon } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import Link from "next/link";

export function ServiceCover(props) {
  const {
    heading,
    subheading,
    label,
    labelPermalink,
    imageSrc,
    link,
    linkText,
  } = props;
  return (
    <Container fluid className={styles.serviceCover}>
      <Shared.Image src={imageSrc} className={styles.background} />
      <Container isContainer className={styles.contentWrapper}>
        <div className={styles.header}>
          <Link href={labelPermalink}>
            <span className={styles.label}>{label}</span>
          </Link>
          <h1 className={styles.heading}>{heading}</h1>
        </div>
        <p className={styles.subheading}>{subheading}</p>
        <Link href={link}>
          <Button>
            <span>{linkText}</span> <Icon name="arrow right"></Icon>
          </Button>
        </Link>
      </Container>
    </Container>
  );
}
