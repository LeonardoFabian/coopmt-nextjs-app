import styles from "./Flex.module.scss";

export function Flex(props) {
  const { children } = props;

  return <div className={styles.flex}>{children}</div>;
}
