import styles from "./Requirements.module.scss";
import { map } from "lodash";
import { Icon } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { Requirement } from "./Requirement/Requirement";

export function Requirements(props) {
  const { heading, requirements } = props;

  return (
    <div className={styles.requirements}>
      <Shared.Separator height={30} />
      <h5 className={styles.heading}>{heading}</h5>
      <div className={styles.wrapper}>
        {map(requirements, (requirement) => (
          <Requirement key={requirement.id} requirement={requirement} />
        ))}
      </div>
      <Shared.Separator height={30} />
    </div>
  );
}
