import styles from "./Cover.module.scss";
import { Image } from "../Image";
import { Container, Button, Icon } from "semantic-ui-react";
import Link from "next/link";

export function Cover(props) {
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
    <Container fluid className={styles.cover}>
      <Image src={imageSrc} className={styles.background} />
      <Container isContainer className={styles.contentWrapper}>
        <div className={styles.header}>
          <Link href={labelPermalink}>
            <span className={styles.label}>{label}</span>
          </Link>
          <h1 className={styles.heading}>{heading}</h1>
        </div>
        <h4 className={styles.subheading}>{subheading}</h4>
        <Link href={link}>
          <Button primary>
            <span>{linkText}</span> <Icon name="arrow right"></Icon>
          </Button>
        </Link>
      </Container>
    </Container>
  );
}
