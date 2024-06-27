import styles from "./Grid.module.scss";
import classNames from "classnames";

export function Grid(props) {
  const { cols, gap, children, className } = props;

  return (
    <div
      className={classNames(styles.grid)}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}`,
      }}
    >
      {children}
    </div>
  );
}
