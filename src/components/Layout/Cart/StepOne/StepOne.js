import styles from "./StepOne.module.scss";
import { Basket } from "./Basket";

export function StepOne(props) {
  const { products } = props;

  return (
    <div className={styles.stepOne}>
      <div className={styles.left}>
        <Basket products={products} />
      </div>
      <div className={styles.right}>
        <h5>Resumen</h5>
      </div>
    </div>
  );
}
