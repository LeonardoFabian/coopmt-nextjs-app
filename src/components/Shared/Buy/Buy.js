import styles from "./Buy.module.scss";
import { Button, Icon } from "semantic-ui-react";

export function Buy() {
  return (
    <>
      <Button primary>
        Comprar ahora <Icon name="cart" />
      </Button>
    </>
  );
}
