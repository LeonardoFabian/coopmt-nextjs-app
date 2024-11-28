import styles from "./MuiXCardPaper.module.scss";
import { MuiXChip } from "../MuiXChip";
import classNames from "classnames";
import { Block } from "@/components/Block";

export function MuiXCardPaper(props) {
  const {
    subtitle,
    text,
    chipContent,
    chipType,
    chipDescriptionContent,
    chipDescriptionCaption,
    chipDescriptionType,
    chipDescriptionIcon,
    chipCaption,
    caption,
    children,
  } = props;

  return (
    <div className={styles.muiXCardPaper}>
      <div className={styles.muiXCardPaperWrapper}>
        <div className={styles.muiXCardContent}>
          <h5 className={styles.muiXCardSubtitle}>{subtitle}</h5>
          <div className={styles.muiXCardStackWrapper}>
            <div className={styles.muiXCardStackContent}>
              <div className={styles.muiXCardStack}>
                <p className={styles.muiXCardText}>{text}</p>
                <span className={styles.caption}>{caption}</span>
              </div>
              <div className={styles.muiXCardMeta}>
                {chipContent && (
                  <MuiXChip type={chipType} caption={chipCaption}>
                    {chipContent}
                  </MuiXChip>
                )}
                {chipDescriptionContent && (
                  <span
                    className={classNames(styles.chipDescription, {
                      [styles.success]: chipDescriptionType === "success",
                      [styles.danger]: chipDescriptionType === "danger",
                      [styles.info]: chipDescriptionType === "info",
                    })}
                  >
                    {chipDescriptionIcon && (
                      <Block.MaterialIcon
                        icon={chipDescriptionIcon}
                        className={styles.chipDescriptionIcon}
                      />
                    )}
                    {chipDescriptionContent && (
                      <span className={styles.chipDescriptionContent}>
                        {chipDescriptionContent}
                      </span>
                    )}
                    {chipDescriptionCaption && (
                      <span className={styles.chipDescriptionCaption}>
                        {chipDescriptionCaption}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
            {children && <div className={styles.muiXCardBox}>{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
