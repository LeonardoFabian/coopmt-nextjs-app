import styles from "./MaterialIcon.module.scss";

export function MaterialIcon(props) {
  const { icon, height = "24px", title = "Icon", onClick } = props;

  const onClickHandler = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <span
      className={styles["material-symbols-outlined"]}
      style={{ fontSize: height }}
      title={title}
      onClick={onClickHandler}
    >
      {icon}
    </span>
  );
}
