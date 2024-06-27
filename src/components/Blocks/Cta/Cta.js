import styles from "./Cta.module.scss";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { size, map } from "lodash";
import Link from "next/link";

export function Cta(props) {
  const { buttons, text, title, theme, image } = props;

  const hasButtons = size(buttons) > 0;

  return (
    <Container fluid className={styles.cta}>
      <Container isContainer className={styles.wrapper}>
        {image ? (
          <>
            <div className={styles.contentWrapper}>
              <div className={styles.content}>
                <Shared.Title
                  tagName={title?.tagName}
                  text={title?.text}
                  align={title?.align}
                  className={styles?.title}
                />
                <Shared.Paragraph
                  paragraph={text?.text}
                  align={text?.align}
                  fontStyle={text?.fontStyle}
                  transform={text?.transform}
                  className={styles?.paragraph}
                />
              </div>
              {hasButtons && (
                <div className={styles.actions}>
                  {map(buttons, (button) => (
                    <Link href={`/${button?.link?.url}`}>
                      <Shared.Button label={button?.link?.label} />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.imageWrapper}>Imagen</div>
          </>
        ) : (
          <>
            <div className={styles.blockContentWrapper}>
              <div className={styles.content}>
                <Shared.Title
                  tagName={title?.tagName}
                  text={title?.text}
                  align={title?.align}
                  className={styles?.title}
                />
                <Shared.Paragraph
                  paragraph={text?.text}
                  align={text?.align}
                  fontStyle={text?.fontStyle}
                  transform={text?.transform}
                  className={styles?.paragraph}
                />
              </div>
              {hasButtons && (
                <div className={styles.actions}>
                  {map(buttons, (button) => (
                    <Link href={`/${button?.link?.url}`}>
                      <Shared.Button label={button?.link?.label} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </Container>
  );
}
