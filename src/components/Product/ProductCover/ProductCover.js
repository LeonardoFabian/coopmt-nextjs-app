import styles from "./ProductCover.module.scss";
import { Container, Button, Icon } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import Link from "next/link";

export function ProductCover(props) {
  const {
    heading,
    description = "",
    label,
    labelPermalink = "",
    imageSrc,
    link = "",
    linkText,
  } = props;
  return (
    <Container fluid className={styles.productCover}>
      <Shared.Image src={imageSrc} className={styles.background} />
      <Container isContainer className={styles.contentWrapper}>
        <div className={styles.header}>
          <Link href={labelPermalink}>
            <span className={styles.label}>{label}</span>
          </Link>
          <h1 className={styles.heading}>{heading}</h1>
        </div>
        <h4 className={styles.description}>{description}</h4>
        <Link href={link}>
          <Button primary>
            <span>{linkText}</span> <Icon name="arrow right"></Icon>
          </Button>
        </Link>
      </Container>
    </Container>
  );
}
