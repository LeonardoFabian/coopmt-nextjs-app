import styles from "./Requirement.module.scss";
import { Icon } from "semantic-ui-react";

export function Requirement(props) {
  const { icon = null, requirement } = props;

  return (
    <div className={styles.requirement}>
      {icon ? <Icon name={icon} /> : <Icon name="check circle" />}
      <p>{requirement.description}</p>
    </div>
  );
}
