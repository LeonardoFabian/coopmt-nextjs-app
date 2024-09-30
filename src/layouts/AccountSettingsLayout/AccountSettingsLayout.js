import Link from "next/link";
import styles from "./AccountSettingsLayout.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

export function AccountSettingsLayout(props) {
  const { children, title } = props;
  const router = useRouter();

  return (
    <div className={styles.settingsLayout}>
      {/* sidebar */}
      <div className={styles.sidebar}>
        <nav className={styles.navigation}>
          <ul>
            {/* Notificaciones generales */}
            <li
              className={classNames({
                [styles.active]: router.pathname === "/me/settings",
              })}
            >
              <Link href="/me/settings">Mi Perfil</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* content  */}
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
