import { Icon } from "semantic-ui-react";
import styles from "./AddToWishlist.module.scss";
import classNames from "classnames";

export function AddToWishlist(props) {
  console.log("AddToWishlist props: ", props);

  const { productId, className } = props;

  return (
    <>
      <Icon
        name="heart"
        className={classNames(styles.wishlistIcon, {
          [className]: className,
        })}
      />
    </>
  );
}
