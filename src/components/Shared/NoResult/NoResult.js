import styles from "./NoResult.module.scss";
import { Container, Icon } from "semantic-ui-react";
import { Alert } from "../Alert";

export function NoResult(props) {
  const { text, title } = props;

  return (
    <Container fluid className={styles.noResult}>
      <Container isContainer className={styles.wrapper}>
        <Alert className="info" text={text} title={title} />
        {/* <h3 className={styles.title}>Sin resultados</h3>
        <p className={styles.text}>{text}</p> */}
      </Container>
    </Container>
  );
}
