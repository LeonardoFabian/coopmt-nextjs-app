import { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import styles from "./AddToWishlist.module.scss";
import classNames from "classnames";
import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";

const wishlistController = new Wishlist();

export function AddToWishlist(props) {
  console.log("AddToWishlist props: ", props);

  const { productId, className } = props;
  const { user } = useAuth();

  const [wishlisted, setWishlisted] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistController.check(user.id, productId);
        console.log("wishlistController response: ", response);
        setWishlisted(response);
      } catch (error) {
        setWishlisted(false);
        console.error(error);
      }
    })();
  }, [productId]);

  const addToWishlist = async () => {
    const response = await wishlistController.add(user.id, productId);
    if (response) {
      setWishlisted(response);
    }
  };

  const removeFromWishlist = async () => {
    try {
      await wishlistController.delete(wishlisted.id);
      setWishlisted(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (wishlisted === null) return null;

  return (
    <>
      <Icon
        name={wishlisted ? "heart" : "heart outline"}
        className={classNames(styles.wishlistIcon, {
          [className]: className,
        })}
        title={wishlisted ? "Añadido a tu lista" : "Añadir a lista de deseos"}
        onClick={wishlisted ? removeFromWishlist : addToWishlist}
      />
    </>
  );
}
