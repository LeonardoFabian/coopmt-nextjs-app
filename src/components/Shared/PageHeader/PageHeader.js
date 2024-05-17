import styles from "./PageHeader.module.scss";
import { Container } from "semantic-ui-react";

export function PageHeader(props) {
  const { title } = props;

  return (
    <Container fluid className={styles.pageHeader}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
      </Container>
    </Container>
  );
}
