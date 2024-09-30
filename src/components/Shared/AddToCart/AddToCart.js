import styles from "./AddToCart.module.scss";
import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useCart } from "@/hooks";
import { Loader } from "semantic-ui-react";

export function AddToCart(props) {
  const { productId } = props;
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setLoading(true);
    addToCart(productId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
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
            <Icon name="cart" /> <span>Añadir al carrito</span>
          </Button>
        </>
      )}
    </>
  );
}
