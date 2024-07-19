import styles from "./BottomBar.module.scss";
import { Container } from "semantic-ui-react";
import { size, map } from "lodash";
import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";

export function BottomBar(props) {
  const { copyright, socialLinks, showSocialLinks } = props;

  return (
    <div className={styles.bottomBar}>
      <Container className={styles.wrapper}>
        <div>
          &copy;{" "}
          <span className={styles.currentYear}>{new Date().getFullYear()}</span>
          . {`${copyright}. Todos los derechos reservados.`}
        </div>
        {showSocialLinks && size(socialLinks) > 0 && (
          <ul className={styles.social}>
            {map(socialLinks, (socialLink) => (
              <li>
                <Link href={socialLink?.url} target="_blank">
                  <Icon name={socialLink?.icon} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
