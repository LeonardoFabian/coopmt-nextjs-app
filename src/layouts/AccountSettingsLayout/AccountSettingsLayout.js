import Link from "next/link";
import styles from "./AccountSettingsLayout.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

export function AccountSettingsLayout(props) {
  const { children, title } = props;
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className={styles.settingsLayout}>
      {/* sidebar */}
      <aside className={styles.sidebar}>
        <nav className={styles.navigation}>
          <ul>
            {/* Notificaciones generales */}
            <li
              className={classNames({
                [styles.active]:
                  router.pathname === "/me/account/profile" ||
                  router.pathname === "/me/account",
              })}
            >
              <Link href="/me/account/profile">Mi Perfil</Link>
            </li>
            <li
              className={classNames({
                [styles.active]: router.pathname === "/me/account/address",
              })}
            >
              <Link href="/me/account/address">Direcciones</Link>
            </li>

            <li
              className={classNames({
                [styles.active]: router.pathname === "/me/account/contact",
              })}
            >
              <Link href="/me/account/contact">Contacto</Link>
            </li>
            <li
              className={classNames({
                [styles.active]:
                  router.pathname === "/me/account/bank-accounts",
              })}
            >
              <Link href="/me/account/bank-accounts">Cuentas Bancarias</Link>
            </li>
            <li
              className={classNames({
                [styles.active]:
                  router.pathname === "/me/account/employment-information",
              })}
            >
              <Link href="/me/account/employment-information">
                Información Laboral
              </Link>
            </li>
            <li
              className={classNames({
                [styles.active]:
                  router.pathname === "/me/account/beneficiaries",
              })}
            >
              <Link href="/me/account/beneficiaries">Beneficiarios</Link>
            </li>
            <li
              className={classNames({
                [styles.active]:
                  router.pathname === "/me/account/personal-references",
              })}
            >
              <Link href="/me/account/personal-references">
                Referencias Personales
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* content  */}
      <main className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h6>{title}</h6>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
