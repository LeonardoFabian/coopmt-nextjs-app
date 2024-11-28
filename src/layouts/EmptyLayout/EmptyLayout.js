import styles from "./EmptyLayout.module.scss";

export function EmptyLayout({ children }) {
  return (
    <>
      <div className={styles.emptyLayout}>
        <div className={styles.container}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
