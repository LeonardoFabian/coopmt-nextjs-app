import styles from "./ServiceCard.module.scss";
import { Block } from "@/components/Block";
import { Icon } from "semantic-ui-react";

export function ServiceCard(props) {
  const { icon, title, content, ...rest } = props;

  const hasDescription = Boolean(content);

  return (
    <div className={styles.serviceCard}>
      <div>
        <Block.MaterialIcon icon={icon} height="50px" />
        {/* <Icon name={icon || "image"} /> */}
      </div>
      <h5 className={styles.title}>{title}</h5>
      {hasDescription && <p className={styles.description}>{content}</p>}
    </div>
  );
}
