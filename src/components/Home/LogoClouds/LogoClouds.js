import styles from "./LogoClouds.module.scss";
import { Shared, Image } from "@/components/Shared";
import { Container } from "semantic-ui-react";
import { map } from "lodash";
import Link from "next/link";

export function LogoClouds({ block }) {
  const { heading, subheading, banners } = block;

  return (
    <Container fluid className={styles.logoClouds}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>

        <div className={styles.content}>
          <Shared.Grid cols="5" gap="30px">
            {map(banners, (banner) => (
              <Link
                key={banner?.id}
                href={banner?.url}
                target={banner?.target || "_self"}
                className={styles.link}
              >
                <Shared.Image
                  src={banner?.image?.url}
                  alt={banner?.image?.alternativeText || "Banner"}
                  title={banner?.title}
                  className={styles.image}
                  height={80}
                />
              </Link>
            ))}
          </Shared.Grid>
        </div>
      </Container>
    </Container>
  );
}
