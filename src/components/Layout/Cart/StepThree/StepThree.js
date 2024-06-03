import styles from "./StepThree.module.scss";
import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";

export function StepThree() {
  return (
    <div className={styles.stepThree}>
      <Icon name="check circle outline" />
      <div className={styles.content}>
        <h5 className={styles.heading}>Compra exitosa!</h5>
        <p>
          Muchas gracias por su compra, su pedido se ha registrado
          satisfactoriamente!
        </p>
      </div>
      <div className={styles.actions}>
        <Button as={Link} href="/account" primary className={styles.action}>
          Ver mis pedidos
        </Button>
      </div>
    </div>
  );
}
