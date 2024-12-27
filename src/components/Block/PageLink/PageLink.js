import styles from "./PageLink.module.scss";
import NextLink from "next/link";
// import { Image } from "@/components/Shared";
import { Shared } from "@/components/Shared";

export function PageLink({ block, onMouseEnter, onMouseLeave }) {
  const { page, label, description, icon } = block;

  // console.log("page: ", page);

  return (
    <NextLink
      href={`/pages/${page.slug}`}
      target="_self"
      className={styles.pageLink}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon.url ? (
        <div className={styles.imageWrapper}>
          <Shared.Image src={icon?.url} alt={icon.alternativeText || "Image"} />
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
