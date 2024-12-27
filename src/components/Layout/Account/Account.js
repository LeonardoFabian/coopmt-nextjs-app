import styles from "./Account.module.scss";
import classNames from "classnames";
import { Label, Button, Dropdown, Loader } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useAuth, useCart } from "@/hooks";
import {
  faArrowRightToBracket,
  faCartShopping,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Shared } from "@/components/Shared";
import { map } from "lodash";
import { Cart, Notification } from "@/api";
import { fn } from "@/utils";
import { Block } from "@/components/Block";
import { useEffect, useState } from "react";

// const quantity = 5;

const cartController = new Cart();
const notificationController = new Notification();

export function Account(props) {
  const { buttons } = props;

  const { quantity } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const notificationsResponse =
            await notificationController.getUserNotifications(user.id);
          const unreadNotifications = notificationsResponse.data.filter(
            (n) => !n.attributes.isRead
          );
          console.log("notificationsResponse: ", notificationsResponse);
          setNotifications(notificationsResponse);
          setUnreadCount(unreadNotifications.length);
        } catch (error) {
          console.log("Error loading notifications: ", error);
        }
      })();
    }
  }, []);

  // console.log("Account user: ", user);

  const goToLogin = () => router.push("/auth/login");

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
    router.push("/cart");
  };

  const handleClick = (e, { fn }) => {
    e.preventDefault();
    switch (fn) {
      case "goToAccount":
        goToAccount();
        break;
      case "goToCart":
        goToCart();
        break;
      default:
        break;
    }
  };

  var userInitials = "";
  if (user) {
    const userNameInitial = fn.getStringInitials(user?.firstName);
    const userLastNameInitial = fn.getStringInitials(user?.lastName);

    userInitials = `${userNameInitial}${userLastNameInitial}`;
  }

  return (
    <div className={styles.account}>
      {/* {map(buttons, (button) => (
        <Shared.Button
          key={button?.id}
          btnClass={button?.class}
          type={button?.type}
          onClick={(e) => handleClick(e, { fn: button?.onClick })}
          icon={
            user && button.toggleIcon && button.type == "login"
              ? button?.toggleIcon
              : button?.icon
          }
          className={classNames({
            flex: button.public == true,
            hidden: !button.public && !user,
            [styles.user]: user && button.type == "login",
          })}
        >
          {button.class !== "icon" && !user
            ? button.label
            : `${user?.firstName} ${user?.lastName}`}
        </Shared.Button>
      ))} */}

      {user && (
        <Button
          className={styles.notifications}
          title="Notificaciones"
          onClick={goToNotifications}
        >
          <Block.MaterialIcon icon="notifications" />
          {unreadCount > 0 && (
            <Label circular className={styles.quantity}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </Label>
          )}
          {/* {quantity > 0 && (
          <Label circular>{quantity > 9 ? "9+" : quantity}</Label>
        )} */}
        </Button>
      )}

      {user && (
        <Button className={styles.cart} title="Mi Cesta" onClick={goToCart}>
          {/* <FontAwesomeIcon icon={faCartShopping} /> */}
          <Block.MaterialIcon icon="local_mall" />
          {quantity > 0 && (
            <Label circular className={styles.quantity}>
              {quantity > 9 ? "9+" : quantity}
            </Label>
          )}
        </Button>
      )}

      {/* user dropdown */}
      {/* <Button
        primary
        className={classNames({ [styles.user]: user })}
        onClick={!user ? goToLogin : goToAccount}
      >
        <FontAwesomeIcon icon={!user ? faArrowRightToBracket : null} />
        {!user ? "Ingresar" : userInitials}
      </Button> */}

      {!user ? (
        <Button primary className={styles.loginButton} onClick={goToLogin}>
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          Inicia sesión
        </Button>
      ) : (
        <Dropdown
          trigger={<Button className={styles.user}>{userInitials}</Button>}
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
              onClick={logout}
            />
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
