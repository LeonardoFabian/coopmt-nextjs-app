import styles from "./PageLink.module.scss";
import NextLink from "next/link";
import { Image } from "@/components/Shared";

export function PageLink({ block }) {
  const { page, target, label, description, icon } = block;

  return (
    <NextLink
      href={`/${page.path}` || "#"}
      target="_self"
      className={styles.pageLink}
    >
      {icon.url ? (
        <div className={styles.imageWrapper}>
          <Image src={icon?.url} alt={icon.alternativeText || "Image"} />
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
