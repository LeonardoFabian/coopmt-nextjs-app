import styles from "./Loans.module.scss";
import { useAuth } from "@/hooks";
import { useAccount } from "@/hooks";
import { Shared } from "@/components/Shared";
import { LoansList } from "./LoansList";

export function UserLoans() {
  const { user } = useAuth();
  const { activeLoans } = useAccount();

  if (!user) {
    return null;
  }

  console.log("userLoans activeloans: ", activeLoans);

  return (
    <>
      <div className={styles.userLoans}>
        <h6 className={styles.title}>Préstamos</h6>
        {activeLoans && <LoansList loans={activeLoans} />}
      </div>
    </>
  );
}
