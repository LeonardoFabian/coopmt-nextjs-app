import styles from "./Link.module.scss";
import NextLink from "next/link";
import { Shared } from "@/components/Shared";

export function Link({ block }) {
  const { url, target, label, description, icon } = block;

  return (
    <NextLink href={url} target={target || "_self"} className={styles.link}>
      {icon.url ? (
        <div className={styles.imageWrapper}>
          <Shared.Image src={icon.url} alt={icon.alternativeText || "Image"} />
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
