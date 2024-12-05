import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { Block } from "@/components/Block";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Shared } from "@/components/Shared";
import classNames from "classnames";
import styles from "./SideMenu.module.scss";
import Link from "next/link";
import { MainMenu, Option } from "@/api";
import { fn } from "@/utils";

const mainMenuController = new MainMenu();
const optionController = new Option();

export function SideMenu(props) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { showSideMenu } = props;

  //   console.log("data: ", data);

  const [menuData, setMenuData] = useState(null);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [openSubMenusLevel2, setOpenSubMenusLevel2] = useState({});
  const [options, setOptions] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await mainMenuController.find();
        console.log("Menu Data: ", response);
        setMenuData(response);

        const optionsResponse = await optionController.getAll();
        console.log("Options: ", optionsResponse.data);
        setOptions(optionsResponse);
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

  const goToLogin = () => router.push("/auth/login");

  const toggleSubMenu = (key) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const toggleSubMenuLevel2 = (key) => {
    setOpenSubMenusLevel2((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div
      className={classNames([styles.sideMenu], { [styles.open]: showSideMenu })}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          {options && (
            <Shared.Logo
              image={options?.attributes?.logo}
              text={options?.attributes?.siteTitle}
              link={options?.attributes?.logoUrl}
            />
          )}

          {/* user options */}
          <div className={styles.menuUserOptions}>
            {user ? (
              <>
                <div className={styles.header}>
                  <span className={styles.initialsAvatar}>{userInitials}</span>
                  <span className={styles.userInfo}>
                    <span className={styles.name}>{userFormattedName}</span>
                    <span>Socio No. {user?.memberId}</span>
                  </span>
                </div>
                <nav className={styles.userMenu}>
                  <ul>
                    <li>
                      <Link href="/banking">CoopVirtual</Link>
                    </li>
                    <li>
                      <Link href="/me/account">Mi cuenta</Link>
                    </li>
                    <li>
                      <Link href="/me/notifications">Mis notificaciones</Link>
                    </li>
                  </ul>
                </nav>
              </>
            ) : (
              <Button
                primary
                className={styles.loginButton}
                onClick={goToLogin}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                Inicia sesión
              </Button>
            )}
          </div>

          {/* menu */}
          <div className={styles.menuGlobalOptions}>
            {menuData && menuData?.menuItems && (
              <nav className={styles.globalMenu}>
                <ul>
                  {menuData.menuItems.map((menuItem, index) => (
                    <li
                      key={index}
                      className={classNames({
                        [styles.active]: router.pathname === menuItem.url,
                      })}
                    >
                      {menuItem?.url && menuItem?.label ? (
                        <Link href={menuItem?.url}>{menuItem.label}</Link>
                      ) : (
                        <>
                          {menuItem?.sections && (
                            <>
                              <button onClick={() => toggleSubMenu(index)}>
                                <span>{menuItem?.heading}</span>
                                <Block.MaterialIcon
                                  icon={
                                    openSubMenus[index]
                                      ? "keyboard_arrow_down"
                                      : "keyboard_arrow_right"
                                  }
                                />
                              </button>
                              <nav
                                className={classNames(styles.subMenuLevel1, {
                                  [styles.open]: openSubMenus[index],
                                })}
                              >
                                <ul>
                                  {menuItem.sections?.data?.map(
                                    (section, secIndex) => (
                                      <li key={`section-${section.heading}`}>
                                        <button
                                          onClick={() =>
                                            toggleSubMenuLevel2(secIndex)
                                          }
                                        >
                                          <span>{section.heading}</span>
                                          <Block.MaterialIcon
                                            icon={
                                              openSubMenusLevel2[secIndex]
                                                ? "keyboard_arrow_down"
                                                : "keyboard_arrow_right"
                                            }
                                          />
                                        </button>
                                        {section?.components && (
                                          <nav
                                            className={classNames(
                                              styles.subMenuLevel2,
                                              {
                                                [styles.open]:
                                                  openSubMenusLevel2[secIndex],
                                              }
                                            )}
                                          >
                                            <ul>
                                              {section.components?.map(
                                                (component, index) => (
                                                  <li
                                                    key={`section-component-${index}`}
                                                  >
                                                    {component?.service && (
                                                      <Link
                                                        href={`/services/${component.service?.slug}`}
                                                      >
                                                        {component.label}
                                                      </Link>
                                                    )}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </nav>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </nav>
                            </>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {user && (
            <div className={styles.actions}>
              <button type="button" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy;
            <span className={styles.currentYear}>
              {new Date().getFullYear()}
            </span>
            .<span>{options?.attributes?.siteTitle}</span>
            Todos los derechos reservados
          </div>
        </div>
      </div>
    </div>
  );
}
