import styles from "./Account.module.scss";
import classNames from "classnames";
import { Label, Button, Loader } from "semantic-ui-react";
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
import { Cart } from "@/api";

// const quantity = 5;

const cartController = new Cart();

export function Account(props) {
  const { buttons } = props;

  const { quantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  console.log("Account user: ", user);

  const goToLogin = () => router.push("/auth/login");

  const goToAccount = () => {
    if (!user) {
      goToLogin();
    } else {
      router.push("/account");
    }
  };

  const goToCart = () => {
    if (!user) {
      goToLogin();
    } else {
      router.push("/cart");
    }
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

      <Button className={styles.cart} onClick={goToCart}>
        <FontAwesomeIcon icon={faCartShopping} />
        {quantity > 0 && (
          <Label circular>{quantity > 9 ? "9+" : quantity}</Label>
        )}
      </Button>

      <Button
        primary
        className={classNames({ [styles.user]: user })}
        onClick={!user ? goToLogin : goToAccount}
      >
        <FontAwesomeIcon icon={!user ? faArrowRightToBracket : faUserCircle} />
        {!user ? "Ingresar" : `${user.firstName} ${user.lastName}`}
      </Button>
    </div>
  );
}
