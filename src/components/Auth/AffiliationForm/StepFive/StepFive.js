import styles from "./StepFive.module.scss";
import { TermsAndConditions } from "./TermsAndConditions";

export function StepFive(props) {
  return (
    <div className={styles.stepFive}>
      <div className={styles.wrapper}>
        <TermsAndConditions {...props} />
      </div>
    </div>
  );
}
