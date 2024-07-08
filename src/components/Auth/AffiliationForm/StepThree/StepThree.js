import styles from "./StepThree.module.scss";
import { Beneficiaries } from "./Beneficiaries";

export function StepThree(props) {
  return (
    <div className={styles.stepThree}>
      <div className={styles.wrapper}>
        <Beneficiaries {...props} />
      </div>
    </div>
  );
}
