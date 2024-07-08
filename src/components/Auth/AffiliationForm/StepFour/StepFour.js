import styles from "./StepFour.module.scss";
import { FileUpload } from "./FileUpload";

export function StepFour(props) {
  return (
    <div className={styles.stepFour}>
      <div className={styles.wrapper}>
        <FileUpload {...props} />
      </div>
    </div>
  );
}
