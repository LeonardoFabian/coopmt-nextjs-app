import styles from "./User.module.scss";
import { useAuth } from "@/hooks";
import { Button, Icon } from "semantic-ui-react";

export function User() {
  const { user } = useAuth();
  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.user}>
      <div className={styles.userInfo}>
        <Button icon className={styles.avatar} circular>
          <Icon name="user outline" />
        </Button>
        <div className={styles.userMeta}>
          <span className={styles.label}> Bienvenid @ </span>
          <h2 className={styles.name}>
            {`${user?.firstName} ${user?.lastName}`}
          </h2>
          <ul className={styles.identifiers}>
            <li> {`${user?.documentId}`} </li>|<li>{`${user?.username}`}</li> |
            <li> {`${user?.email}`} </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
