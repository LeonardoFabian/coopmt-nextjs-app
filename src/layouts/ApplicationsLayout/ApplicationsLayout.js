import classNames from "classnames";
import Link from "next/link";
import styles from "./ApplicationsLayout.module.scss";

export function ApplicationsLayout({ children }) {
  return (
    <>
      <div className={styles.applicationLayout}>
        <div className={styles.header}></div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
