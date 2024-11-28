import styles from "./MaterialIcon.module.scss";
import classNames from "classnames";

export function MaterialIcon(props) {
  const { icon, height = "24px", title = "Icon", onClick, className } = props;

  const onClickHandler = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <span
      className={classNames(styles["material-symbols-outlined"], className)}
      style={{ fontSize: height }}
      title={title}
      onClick={onClickHandler}
    >
      {icon}
    </span>
  );
}
