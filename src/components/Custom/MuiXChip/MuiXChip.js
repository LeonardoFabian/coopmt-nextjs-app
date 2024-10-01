import styles from "./MuiXChip.module.scss";
import classNames from "classnames";

export function MuiXChip(props) {
  const { children, type = "default" } = props;

  return (
    <div className={classNames(styles.muiXChip, styles[type])}>
      <span>{children}</span>
    </div>
  );
}
