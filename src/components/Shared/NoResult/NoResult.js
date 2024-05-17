import styles from "./NoResult.module.scss";
import { Container } from "semantic-ui-react";

export function NoResult(props) {
  const { text } = props;

  return (
    <Container fluid className={styles.noResult}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.title}>{text}</h2>
      </Container>
    </Container>
  );
}
