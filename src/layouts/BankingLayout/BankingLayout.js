import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import styles from "./BankingLayout.module.scss";
import classNames from "classnames";
import { Block } from "@/components/Block";
import { Shared } from "@/components/Shared";
import { fn } from "@/utils";
import { Option, User } from "@/api";
import { useState, useEffect, use } from "react";
import { Button, Dropdown } from "semantic-ui-react";

const optionController = new Option();
const userController = new User();

export function BankingLayout(props) {
  const { children, title } = props;
  const router = useRouter();
  const { user, logout } = useAuth();
  const [options, setOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
        console.log("options: ", response.data);
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  var userInitials = "";
  if (user) {
    const userNameInitial = fn.getStringInitials(user?.firstName);
    const userLastNameInitial = fn.getStringInitials(user?.lastName);

    userInitials = `${userNameInitial}${userLastNameInitial}`;
  }

  var userFormattedName = "";
  if (user) {
    userFormattedName =
      fn.getFirstWordForString(user?.firstName) +
      " " +
      fn.getFirstWordForString(user?.lastName);
  }

  const logo =
    options?.attributes?.logoDark?.data?.attributes?.url ?? "/images/logo.svg";

  const goToLogin = () => router.push("/auth/login");

  const handleLogout = async () => {
    try {
      const currentDateTimeReadable = fn.getCurrentDateTimeInHumansReadable();
      const response = await userController.updateMe(user.id, {
        lastConnection: currentDateTimeReadable,
      });
      logout();
    } catch (error) {
      console.error("Error during handle logout process: ", error);
    }
  };

  const goToAccount = () => {
    if (!user) {
      goToLogin();
    } else {
      router.push("/me");
    }
  };

  const goToBanking = () => {
    if (!user) {
      goToLogin();
    } else {
      router.push("/banking");
    }
  };

  const goToDashboard = () => {
    if (!user) {
      goToLogin();
    } else {
      router.push("/account"); // TODO: create dashboard
    }
  };

  const goToUserNotifications = () => {
    if (!user) {
      goToLogin();
    } else {
      router.push("/me/notifications");
    }
  };

  const goToNotifications = () => {
    router.push("/notificaciones");
  };

  const goToCart = () => {
    if (!user) {
      goToLogin();
    } else {
      router.push("/cart");
    }
  };

  const handleIsMenuOpen = () => {
    setIsMenuOpen((value) => !value);
  };

  return (
    <>
      <div className={styles.bankingLayout}>
        {/* sidebar */}
        <div
          className={classNames([styles.sidebar], {
            [styles.hidden]: !isMenuOpen,
          })}
        >
          <div className={styles.topBar}>
            <Button
              icon={isMenuOpen ? "close" : "bars"}
              className={styles.menuTriggerButton}
              onClick={handleIsMenuOpen}
            />
            <span>
              <Shared.Logo
                image={logo}
                alt="Logo"
                className={classNames([styles.logo], {
                  [styles.visible]: isMenuOpen,
                  [styles.hidden]: !isMenuOpen,
                })}
              />
            </span>
          </div>
          <div
            className={classNames([styles.header], {
              [styles.hidden]: !isMenuOpen,
            })}
          >
            <span className={styles.initialsAvatar}>{userInitials}</span>
            <span className={styles.userInfo}>
              <span className={styles.name}>{user?.firstName}</span>
              <span>Socio No. {user?.memberId}</span>
            </span>
          </div>
          <h6 className={classNames({ [styles.hidden]: !isMenuOpen })}>Menu</h6>
          <nav className={styles.navigation}>
            <ul>
              {/* Dashboard: Vista general con información clave de los productos. */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/banking",
                })}
              >
                <Link href="/banking">
                  <Block.MaterialIcon icon="dashboard" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              {/* Mis Productos:
Cuentas de ahorro: Listado de cuentas y saldos disponibles.
Préstamos: Listado de préstamos activos, monto, plazos y cuotas. */}
              <li
                className={classNames({
                  [styles.active]:
                    router.pathname === "/banking/products" ||
                    router.pathname === "/banking/products/accounts" ||
                    router.pathname ===
                      "/banking/products/accounts/[accountId]" ||
                    router.pathname === "/banking/products/loans" ||
                    router.pathname === "/banking/products/loans/[loanId]",
                })}
              >
                <Link href="/banking/products">
                  <Block.MaterialIcon icon="account_balance" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Mis Productos
                  </span>
                </Link>
              </li>
              {/* Historial de Movimientos:
Consultar movimientos de cuentas y pagos de préstamos.  */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/banking/history",
                })}
              >
                <Link href="/banking/history">
                  <Block.MaterialIcon icon="history" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Historial de Movimientos
                  </span>
                </Link>
              </li>
              {/* Solicitudes:
Solicitud de préstamos, apertura de cuentas, otros productos. */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/banking/applications",
                })}
              >
                <Link href="/banking/applications">
                  <Block.MaterialIcon icon="request_quote" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Solicitudes
                  </span>
                </Link>
              </li>

              {/* Ayuda y soporte: Enlace a preguntas frecuentes o contacto. */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/soporte",
                })}
              >
                <Link href="/soporte">
                  <Block.MaterialIcon icon="help_outline" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Ayuda y Soporte
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.footer}>
            <Button
              primary
              onClick={logout}
              className={classNames({ [styles.icon]: !isMenuOpen })}
            >
              <Block.MaterialIcon icon="logout" />{" "}
              <span
                className={classNames([styles.linkText], {
                  [styles.visible]: isMenuOpen === true,
                })}
              >
                Cerrar sesión
              </span>
            </Button>
          </div>
        </div>
        {/* content */}
        <div className={styles.content}>
          <header>
            <span className={styles.title}>{router.pathname}</span>
            <span className={styles.userHeaderOptions}>
              <span className={styles.loginInfoBlock}>
                <span className={styles.loginInfo}>
                  {user?.gender && user.gender === "feminino"
                    ? "Bienvenida"
                    : "Bienvenido"}
                  <span className={styles.name}>{userFormattedName}</span>
                </span>
                <span className={styles.lastConnection}>
                  Última conexion {user?.lastConnection}
                </span>
              </span>
              <Dropdown
                trigger={
                  <Button className={styles.user}>{userInitials}</Button>
                }
                className={styles.dropdown}
                pointing="top right"
                icon={null}
              >
                <Dropdown.Menu>
                  {/* <Dropdown.Item text="COOPVIRTUAL" onClick={goToDashboard} /> */}
                  <Dropdown.Item text="CoopVirtual" onClick={goToBanking} />
                  <Dropdown.Item text="Mi cuenta" onClick={goToAccount} />
                  <Dropdown.Item
                    text="Mis notificaciones"
                    onClick={goToUserNotifications}
                  />
                  <Dropdown.Item
                    text="Cerrar sesión"
                    className={styles.logout}
                    onClick={handleLogout}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </header>
          <div className={styles.mainContent}>
            <div className={styles.mainContentHeader}>
              <h6 className={styles.mainContentTitle}>{title}</h6>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
