import styles from "./Accounts.module.scss";
import { useAuth } from "@/hooks";
import { useAccount } from "@/hooks";
import { AccountsList } from "./AccountsList";

export function UserAccounts() {
  const { user } = useAuth();
  const { contributionBalance } = useAccount();

  if (!user) {
    return null;
  }

  console.log("userAccounts contributionBalance: ", contributionBalance);

  return (
    <>
      <div className={styles.userAccounts}>
        <h6 className={styles.title}>Cuentas</h6>
        {contributionBalance && (
          <AccountsList user={user} accounts={contributionBalance} />
        )}
      </div>
    </>
  );
}
