import styles from "./PageHeader.module.scss";
import { Container } from "semantic-ui-react";

export function PageHeader(props) {
  const { title } = props;

  return (
    <Container fluid className={styles.pageHeader}>
      <Container isContainer className={styles.wrapper}>
        <h3 className={styles.title}>{title}</h3>
      </Container>
    </Container>
  );
}
