import styles from "./Payment.module.scss";
import { CardElement } from "@stripe/react-stripe-js";

export function Payment() {
  const cardStyle = {
    style: {
      base: {
        color: "#263238",
        fontSize: "16px",
        "::placeholder": {
          color: "#909090",
        },
      },
    },
  };
  return (
    <div className={styles.payment}>
      <h5 className={styles.heading}>Método de pago</h5>

      <div className={styles.content}>
        <CardElement options={cardStyle} />
      </div>
    </div>
  );
}
