import styles from "./MobileBanner.module.scss";
import { Container } from "semantic-ui-react";
import { Image } from "../../Image";
import Link from "next/link";

export function MobileBanner(props) {
  const { ad, title, text, url, target } = props;
  const hasUrl = Boolean(url);
  return (
    <div className={styles.mobileBanner}>
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
