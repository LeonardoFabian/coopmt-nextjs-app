import styles from "./StepOne.module.scss";
import { Basket } from "./Basket";
import { Summary } from "./Summary";

export function StepOne(props) {
  const { products } = props;

  return (
    <div className={styles.stepOne}>
      <div className={styles.left}>
        <Basket products={products} />
      </div>
      <div className={styles.right}>
        <Summary products={products} />
      </div>
    </div>
  );
}
