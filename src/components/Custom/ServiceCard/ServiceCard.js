import styles from "./ServiceCard.module.scss";
import { Icon } from "semantic-ui-react";

export function ServiceCard(props) {
  const { icon, title, content, ...rest } = props;

  const hasDescription = Boolean(content);

  return (
    <div className={styles.serviceCard}>
      <div>
        <Icon name={icon || "image"} />
      </div>
      <h5 className={styles.title}>{title}</h5>
      {hasDescription && <p className={styles.description}>{content}</p>}
    </div>
  );
}
