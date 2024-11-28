import styles from "./ResultItem.module.scss";
import Link from "next/link";
import { Shared } from "@/components/Shared";
import { fn } from "@/utils";

export function ResultItem(props) {
  const { title, description, date, link, image, category } = props;

  console.log("ResultItem props: ", image);

  const publishedAt = `Publicado el ${fn.formatDate(date)}`;
  const imageUrl = image?.attributes?.url;
  const imageAlt = image?.attributes?.alternativeText;

  return (
    <div className={styles.resultItem}>
      <div className={styles.topBar}>
        <div className={styles.info}>
          {category && <span className={styles.category}>{category}</span>}
          <p className={styles.date}>{publishedAt}</p>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <Link href={link}>
            <h3 className={styles.title}>{title}</h3>
          </Link>
          <p className={styles.description}>{description}</p>
        </div>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <Shared.Image src={imageUrl} alt={imageAlt || "Imagen"} />
          </div>
        )}
      </div>
    </div>
  );
}
