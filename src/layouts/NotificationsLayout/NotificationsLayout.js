import Link from "next/link";
import { Notification } from "@/api";
import styles from "./NotificationsLayout.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

export function NotificationsLayout(props) {
  const { children, title } = props;
  const router = useRouter();

  return (
    <div className={styles.notificationsLayout}>
      {/* sidebar */}
      <div className={styles.sidebar}>
        <nav className={styles.navigation}>
          <ul>
            {/* Notificaciones generales */}
            <li
              className={classNames({
                [styles.active]: router.pathname === "/notificaciones",
              })}
            >
              <Link href="/notificaciones">Principal</Link>
            </li>
            {/* Bandeja de entrada */}
            <li
              className={classNames({
                [styles.active]: router.pathname === "/me/notifications",
              })}
            >
              <Link href="/me/notifications">Bandeja de Entrada</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h6>{title}</h6>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
