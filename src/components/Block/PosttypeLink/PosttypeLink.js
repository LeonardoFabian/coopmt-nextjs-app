import styles from "./PosttypeLink.module.scss";
import NextLink from "next/link";

export function PosttypeLink(props) {
  const { label, post_type } = props;
  return (
    <NextLink
      href={`/publicaciones/${post_type?.slug}`}
      target="_self"
      className={styles.postTypeLink}
    >
      <span className={styles.label}>{label}</span>
    </NextLink>
  );
}
