import styles from "./ResponsiveLandscape.module.scss";
import { Container } from "semantic-ui-react";
import { Image } from "../../Image";
import Link from "next/link";

export function ResponsiveLandscape(props) {
  const { ad, title, text, url, target } = props;

  const hasUrl = Boolean(url);
  const hasTitle = Boolean(title);
  const hasText = Boolean(text);

  return (
    <div className={styles.responsiveLandscape}>
      {hasUrl ? (
        <Link href={url} target={target || "_self"}>
          <Image
            src={ad?.image?.url}
            alt={ad?.image?.alternativeText || "Imagen"}
          />
        </Link>
      ) : (
        <Image
          src={ad?.image?.url}
          alt={ad?.image?.alternativeText || "Imagen"}
        />
      )}
    </div>
  );
}
