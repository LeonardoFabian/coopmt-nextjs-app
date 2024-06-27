import styles from "./StepOne.module.scss";
import { PersonalInfo } from "./PersonalInfo";

export function StepOne(props) {
  return (
    <div className={styles.stepOne}>
      <div className={styles.wrapper}>
        <PersonalInfo {...props} />
      </div>
    </div>
  );
}
