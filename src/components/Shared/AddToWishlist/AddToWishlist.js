import { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import styles from "./AddToWishlist.module.scss";
import classNames from "classnames";
import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// import { Block } from "@/components/Block";

const wishlistController = new Wishlist();

export function AddToWishlist(props) {
  // console.log("AddToWishlist props: ", props);

  const { productId, className, title, supplier, price } = props;
  const { user } = useAuth();
  const router = useRouter();

  const [wishlisted, setWishlisted] = useState(null);

  if (!user) {
    // router.push("/auth/login");
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistController.check(user?.id, productId);
        // console.log("wishlistController response: ", response);
        setWishlisted(response);
      } catch (error) {
        setWishlisted(false);
        console.error(error);
      }
    })();
  }, [productId]);

  const addToWishlist = async () => {
    if (!user) {
      router.push("/auth/login");
      return null;
    }
    const response = await wishlistController.add(user?.id, productId);
    if (response) {
      setWishlisted(response);
    }

    if (typeof window.gtag === "function") {
      if (user) {
        window.gtag("event", "add_to_wishlist", {
          user_id: user.id,
          product_id: productId,
          product_name: title,
          product_price: price,
          product_supplier: supplier,
        });
      } else {
        window.gtag("event", "add_to_wishlist", {
          user_id: "anonymous",
          product_id: productId,
          product_name: title,
          product_price: price,
          product_supplier: supplier,
        });
      }
    }

    toast.success("Producto añadido a tu lista de deseos");
  };

  const removeFromWishlist = async () => {
    try {
      await wishlistController.delete(wishlisted.id);
      setWishlisted(false);

      if (typeof window.gtag === "function") {
        if (user) {
          window.gtag("event", "remove_from_wishlist", {
            user_id: user.id,
            product_id: productId,
            product_name: title,
            product_price: price,
            product_supplier: supplier,
          });
        } else {
          window.gtag("event", "remove_from_wishlist", {
            user_id: "anonymous",
            product_id: productId,
            product_name: title,
            product_price: price,
            product_supplier: supplier,
          });
        }
      }

      toast.warn("Producto eliminado de tu lista de deseos");
    } catch (error) {
      console.error(error);
    }
  };

  if (wishlisted === null) return null;

  return (
    <>
      <Icon
        name={wishlisted ? "bookmark" : "bookmark outline"}
        className={classNames(styles.wishlistIcon, {
          [className]: className,
          [styles.wishlisted]: wishlisted,
        })}
        title={
          wishlisted ? "Remover de lista de deseos" : "Añadir a lista de deseos"
        }
        onClick={wishlisted ? removeFromWishlist : addToWishlist}
      />
    </>
  );
}
