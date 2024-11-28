import styles from "./Loans.module.scss";
import { useAuth } from "@/hooks";
import { LoansList } from "./LoansList";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loan } from "@/api";

const loanController = new Loan();

export function UserLoans() {
  const { user } = useAuth();
  const [activeLoans, setActiveLoans] = useState([]);

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const activeLoansResponse = await loanController.getUserActiveLoans(
            user.memberId
          );
          setActiveLoans(activeLoansResponse);
        } catch (error) {
          console.log("Error getting user loans: ", error);
        }
      })();
    }
  }, []);

  // console.log("userLoans activeloans: ", activeLoans);

  return (
    <>
      <div className={styles.userLoans}>
        <div className={styles.userLoansHeader}>
          <h6 className={styles.title}>Préstamos</h6>
          <span className={styles.actions}>
            <Link href="/formularios/solicitud-de-prestamo">
              Solicitar Préstamo
            </Link>
          </span>
        </div>
        {activeLoans && <LoansList user={user} loans={activeLoans} />}
      </div>
    </>
  );
}
