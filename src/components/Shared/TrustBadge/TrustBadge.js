import styles from "./TrustBadge.module.scss";
import { Icon } from "semantic-ui-react";

export function TrustBadge(props) {
  const { icon, title, description, ...rest } = props;

  const hasDescription = Boolean(description);

  return (
    <div className={styles.trustBadge}>
      <Icon name={icon || "icon"} />
      <h5 className={styles.title}>{title}</h5>
      {hasDescription && <p className={styles.description}>{description}</p>}
    </div>
  );
}
