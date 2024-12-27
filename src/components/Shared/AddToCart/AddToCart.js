import styles from "./AddToCart.module.scss";
import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useCart } from "@/hooks";
import { Loader } from "semantic-ui-react";
import { Block } from "@/components/Block";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";

export function AddToCart(props) {
  const { user } = useAuth();
  const { productId, title, supplier, price } = props;
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setLoading(true);
    addToCart(productId);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (typeof window.gtag === "function") {
      if (user) {
        window.gtag("event", "add_to_cart", {
          user_id: user.id,
          product_id: productId,
          product_name: title,
          product_price: price,
          product_supplier: supplier,
        });
      } else {
        window.gtag("event", "add_to_cart", {
          user_id: "anonymous",
          product_id: productId,
          product_name: title,
          product_price: price,
          product_supplier: supplier,
        });
      }
    }

    toast.success("Producto añadido a tu cesta!");
  };

  return (
    <>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          <Button
            type="button"
            secondary
            fluid
            onClick={handleAddToCart}
            className={styles.addToCart}
          >
            <Block.MaterialIcon icon="local_mall" height="24px" />
            Añadir a mi cesta
          </Button>
        </>
      )}
    </>
  );
}
