import styles from "./MuiXChip.module.scss";
import classNames from "classnames";

export function MuiXChip(props) {
  const { children, type = "default", caption } = props;

  return (
    <div className={styles.muiXChip}>
      <div className={classNames(styles.muiXChipBadge, styles[type])}>
        <span>{children}</span>
      </div>
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  );
}
