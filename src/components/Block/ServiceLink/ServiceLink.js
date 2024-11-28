import styles from "./ServiceLink.module.scss";
import Link from "next/link";
import { Icon } from "semantic-ui-react";

export function ServiceLink(props) {
  const { label, description, icon, service } = props;
  const hasDescription = Boolean(description);

  return (
    <Link
      href={`/services/${service?.slug}`}
      target="_self"
      className={styles.serviceLink}
    >
      <Icon name={icon?.name} />
      <div className={styles.meta}>
        <span className={styles.name}>{label}</span>
        {hasDescription && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </Link>
  );
}
