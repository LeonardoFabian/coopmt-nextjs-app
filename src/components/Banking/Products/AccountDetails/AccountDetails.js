import styles from "./AccountDetails.module.scss";
import { useAuth } from "@/hooks";
import { AccountInfo } from "./AccountInfo";
import { AccountTransactions } from "./AccountTransactions";
import { TotalSavingsAndWithdrawals } from "./TotalSavingsAndWithdrawals";

export function AccountDetails(props) {
  const { accountId, transactions } = props;
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const account = {
    accountId: accountId,
    type: "Cuenta de Aportaciones",
  };

  return (
    <div className={styles.accountDetails}>
      <div className={styles.accountDetailsInfo}>
        <AccountInfo account={account} />
        <TotalSavingsAndWithdrawals account={account} />
      </div>
      <div className={styles.accountDetailsTransactions}>
        <AccountTransactions account={account} />
      </div>
    </div>
  );
}
