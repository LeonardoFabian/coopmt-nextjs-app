// import styles from "./DropdownItem.module.scss";
import { Image } from "@/components/Shared";

export function DropdownItem(props) {
  const { text, description, icon } = props;

  return (
    <div className={styles.dropdownItem}>
      {icon?.url && (
        <div className={styles.imageWrapper}>
          <Image src={icon.url} alt={icon.alternativeText} />
        </div>
      )}
      <div className={styles.metaData}>
        <span className={styles.text}>{text}</span>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </div>
  );
}
