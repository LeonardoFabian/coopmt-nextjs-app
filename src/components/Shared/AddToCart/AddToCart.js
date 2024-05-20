import styles from "./AddToCart.module.scss";
import { Button, Icon } from "semantic-ui-react";

export function AddToCart() {
  return (
    <>
      <Button secondary>
        <Icon name="cart plus" /> Añadir al carrito
      </Button>
    </>
  );
}
