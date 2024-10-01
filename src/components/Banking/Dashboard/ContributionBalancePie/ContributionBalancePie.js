import styles from "./ContributionBalancePie.module.scss";
import { useAuth } from "@/hooks";
import { useAccount } from "@/hooks";

export function ContributionBalancePie() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.contributionBalancePie}>
        <h6>aqui contributions</h6>
      </div>
    </>
  );
}
