import styles from "./FeaturesSection.module.scss";
import { Shared } from "@/components/Shared";
import { Container } from "semantic-ui-react";
import { map } from "lodash";

export function FeaturesSection({ data }) {
  const { title, description, feature } = data;

  return (
    <Container fluid className={styles.featuresSection}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDescription}>{description}</p>

        <div className={styles.content}>
          <Shared.Grid cols="3" gap="30px">
            {map(feature, (item) => (
              <Shared.Card
                key={item.id}
                title={item.heading}
                content={item.subheading}
                icon={item.icon}
              />
            ))}
          </Shared.Grid>
        </div>
      </Container>
    </Container>
  );
}
