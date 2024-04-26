import styles from "./FlexItem.module.scss";

export function FlexItem(props) {
  const { flexBasis } = props;

  const className = {
    flexBasis: `${flexBasis}`,
  };

  return <div className={styles.item}></div>;
}
