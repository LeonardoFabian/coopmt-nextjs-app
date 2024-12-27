import styles from "./Link.module.scss";
import NextLink from "next/link";
import { Shared } from "@/components/Shared";
import { Icon } from "semantic-ui-react";

export function Link({ block, onMouseEnter, onMouseLeave }) {
  const { url, target, label, description, icon } = block;

  return (
    <NextLink
      href={url}
      target={target || "_self"}
      className={styles.link}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon?.name ? (
        <div className={styles.imageWrapper}>
          <Icon name={icon.name} />
        </div>
      ) : null}
      <div className={styles.metaData}>
        <span className={styles.label}>{label}</span>
        {description && (
          <small className={styles.description}>{description}</small>
        )}
      </div>
    </NextLink>
  );
}
