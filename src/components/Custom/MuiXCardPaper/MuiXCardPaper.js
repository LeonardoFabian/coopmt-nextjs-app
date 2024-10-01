import styles from "./MuiXCardPaper.module.scss";
import { MuiXChip } from "../MuiXChip";

export function MuiXCardPaper(props) {
  const { subtitle, text, chipContent, chipType, caption, children } = props;

  return (
    <div className={styles.muiXCardPaper}>
      <div className={styles.muiXCardPaperWrapper}>
        <div className={styles.muiXCardContent}>
          <h5 className={styles.muiXCardSubtitle}>{subtitle}</h5>
          <div className={styles.muiXCardStackWrapper}>
            <div className={styles.muiXCardStackContent}>
              <div className={styles.muiXCardStack}>
                <p className={styles.muiXCardText}>{text}</p>
                {chipContent && (
                  <MuiXChip type={chipType}>{chipContent}</MuiXChip>
                )}
              </div>
              <span className={styles.caption}>{caption}</span>
            </div>
            <div className={styles.muiXCardBox}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
