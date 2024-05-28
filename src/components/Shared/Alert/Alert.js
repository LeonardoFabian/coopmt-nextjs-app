import styles from "./Alert.module.scss";
import { Icon } from "semantic-ui-react";

export function Alert(props) {
  const { title, text, className } = props;
  switch (className) {
    case "info":
      return (
        <div className={styles.info}>
          <Icon name="info circle" />
          <div className={styles.content}>
            <h6 className={styles.title}>{title || "Información"}</h6>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      );
      break;
    case "success":
      return (
        <div className={styles.success}>
          <Icon name="check circle" />
          <div className={styles.content}>
            <h6 className={styles.title}>{title || "Completado"}</h6>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      );
      break;
    case "danger":
      return (
        <div className={styles.danger}>
          <Icon name="exclamation circle" />
          <div className={styles.content}>
            <h6 className={styles.title}>{title || "Peligro"}</h6>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      );
      break;

    case "warning":
      return (
        <div className={styles.warning}>
          <Icon name="exclamation triangle" />
          <div className={styles.content}>
            <h6 className={styles.title}>{title || "Advertencia"}</h6>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      );
      break;
    default:
      return (
        <div className={styles.default}>
          <div className={styles.content}>
            <h6 className={styles.title}>{title || "Aviso"}</h6>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      );
      break;
  }
}
