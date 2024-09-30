import styles from "./TrustBadge.module.scss";
import { Block } from "@/components/Block";

export function TrustBadge(props) {
  const { icon, title, description, ...rest } = props;

  const hasDescription = Boolean(description);

  return (
    <div className={styles.trustBadge}>
      <Block.MaterialIcon icon={icon} />
      <h5 className={styles.title}>{title}</h5>
      {hasDescription && <p className={styles.description}>{description}</p>}
    </div>
  );
}
