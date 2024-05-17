import styles from "./Banner.module.scss";
import { Image } from "../Image";
import { Block } from "@/components/Block";

export function Banner(props) {
  const { image, title, link, target } = props;

  const hasTitle = Boolean(title);

  return (
    <a href={`${link}`} target={target}>
      <div className={styles.banner}>
        <Image src={`${image?.url}`} />
        {hasTitle && (
          <div>
            <h2 className={styles.title}>{title}</h2>
          </div>
        )}
      </div>
    </a>
  );
}
