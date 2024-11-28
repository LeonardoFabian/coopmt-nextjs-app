import styles from "./Accounts.module.scss";
import { useAuth } from "@/hooks";
import { AccountsList } from "./AccountsList";
import { useEffect, useState } from "react";
import { Account } from "@/api";

const accountController = new Account();

export function UserAccounts() {
  const { user } = useAuth();
  const [contributionBalance, setContributionBalance] = useState(null);

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const contributionBalanceResponse =
            await accountController.getContributionBalance(user.memberId);
          setContributionBalance(contributionBalanceResponse);
        } catch (error) {
          console.log("Error getting user accounts: ", error);
        }
      })();
    }
  }, []);

  // console.log("userAccounts contributionBalance: ", contributionBalance);

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
