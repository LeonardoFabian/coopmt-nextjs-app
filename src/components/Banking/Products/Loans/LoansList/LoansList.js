import { Shared } from "@/components/Shared";
import styles from "./LoansList.module.scss";
import numeral from "numeral";
import { useRouter } from "next/router";

export function LoansList(props) {
  const { user, loans } = props;
  const router = useRouter();
  console.log("loansList loans: ", loans);

  const handleLoanClick = (loanId) => {
    router.push(`/banking/products/loans/${loanId}`);
  };

  return (
    <>
      <div className={styles.loanList}>
        {loans?.activeLoans && loans?.activeLoans?.length > 0 ? (
          <ul className={styles.loanListWrapper}>
            {loans.activeLoans.map((loan) => {
              const loanId = loan["number"];
              const type = loan["type"];
              const totalBalance = loan["totalBalance"];

              return (
                <li
                  key={`loan-item-${loanId}`}
                  className={styles.loanListItem}
                  onClick={() => handleLoanClick(loanId)}
                >
                  <span className={styles.loanListLeft}>
                    <span className={styles.numberCol}>
                      <span className={styles.label}>No.</span>
                      <span className={styles.number}>{`*${loanId}`}</span>
                    </span>
                    <span className={styles.typeCol}>
                      <span className={styles.label}>Tipo</span>
                      <span className={styles.type}>{type}</span>
                    </span>
                  </span>
                  <span className={styles.loanListRight}>
                    <span className={styles.balanceCol}>
                      <span className={styles.label}>Balance</span>
                      <span className={styles.balance}>{`RD$${numeral(
                        totalBalance.toFixed(2)
                      ).format("0,0.00")}`}</span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <Shared.Alert
            className="info"
            text="No tienes prestamos activos o no hemos podido establecer comunicación con el servidor. Por favor, actualiza la página o intenta más tarde."
          />
        )}
      </div>
    </>
  );
}
