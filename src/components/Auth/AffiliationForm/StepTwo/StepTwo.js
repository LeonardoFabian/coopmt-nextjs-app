import styles from "./StepTwo.module.scss";
import { EmploymentInformation } from "./EmploymentInformation";

export function StepTwo(props) {
  return (
    <div className={styles.stepTwo}>
      <div className={styles.wrapper}>
        <EmploymentInformation {...props} />
      </div>
    </div>
  );
}
