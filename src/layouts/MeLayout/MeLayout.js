import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./MeLayout.module.scss";
import classNames from "classnames";
import { Block } from "@/components/Block";
import { Shared } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { fn } from "@/utils";
import { Option, User } from "@/api";
import { useEffect, useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";

const optionController = new Option();
const userController = new User();

export function MeLayout(props) {
  const { children, title } = props;
  const router = useRouter();
  const { user, logout } = useAuth();
  const [options, setOptions] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  if (!user) {
    router.push("/");
    return null;
  }

  // get options from strapi
  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
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
    options?.attributes?.logo?.data?.attributes?.url ?? "/images/logo.svg";

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
      <div className={styles.meLayout}>
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
              {/* Inicio del Dashboard: Resumen general con información clave. */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/me",
                })}
              >
                <Link href="/me">
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
              {/* Información personal: Permite gestionar datos como dirección, teléfono y cuenta bancaria. */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/me/account",
                })}
              >
                <Link href="/me/account">
                  <Block.MaterialIcon icon="manage_accounts" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Ajustes de la cuenta
                  </span>
                </Link>
              </li>
              {/* Solicitudes: Muestra solicitudes de afiliación, préstamos y cotizaciones. */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/me/applications",
                })}
              >
                <Link href="/me/applications">
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
              {/* Historial: Visualización del historial de solicitudes y sus estados.  */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/me/history",
                })}
              >
                <Link href="/me">
                  <Block.MaterialIcon icon="history" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Historial
                  </span>
                </Link>
              </li>
              {/* Suscripciones: Cursos y eventos en los que está inscrito el usuario.  */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/me/subscriptions",
                })}
              >
                <Link href="/me">
                  <Block.MaterialIcon icon="event_available" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Suscripciones
                  </span>
                </Link>
              </li>
              {/* Beneficiarios y relaciones: Gestión de beneficiarios y relaciones familiares.  */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/me/beneficiaries",
                })}
              >
                <Link href="/me">
                  <Block.MaterialIcon icon="group" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Beneficiarios
                  </span>
                </Link>
              </li>
              {/* Notificaciones: Panel para ver notificaciones importantes. */}
              <li
                className={classNames({
                  [styles.active]:
                    router.pathname === "/me/notifications" ||
                    router.pathname === "/notificaciones",
                })}
              >
                <Link href="/notificaciones">
                  <Block.MaterialIcon icon="notifications_active" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Notificaciones
                  </span>
                </Link>
              </li>
              {/* Mi wishlist: Ver y administrar productos/servicios guardados. */}
              <li
                className={classNames({
                  [styles.active]: router.pathname === "/me/wishlist",
                })}
              >
                <Link href="/me/wishlist">
                  <Block.MaterialIcon icon="favorite_border" />
                  <span
                    className={classNames([styles.linkText], {
                      [styles.visible]: isMenuOpen === true,
                    })}
                  >
                    Lista de Deseos
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
