import { Shared } from "@/components/Shared";
import styles from "./AccountsList.module.scss";
import numeral from "numeral";

export function AccountsList(props) {
  const { user, accounts } = props;
  console.log("accountsList accounts: ", accounts);

  const amount = accounts?.data["balance"];
  const number = user?.memberId;
  const type = `Cuenta de Aportaciones`;

  return (
    <>
      <div className={styles.accountsList}>
        {accounts ? (
          <ul className={styles.accountsListWrapper}>
            <li className={styles.accountsListItem}>
              <span className={styles.accountsListLeft}>
                <span className={styles.numberCol}>
                  <span className={styles.label}>No.</span>
                  <span className={styles.number}>{`*${number}`}</span>
                </span>
                <span className={styles.typeCol}>
                  <span className={styles.label}>Tipo</span>
                  <span className={styles.type}>{type}</span>
                </span>
              </span>
              <span className={styles.accountsListRight}>
                <span className={styles.balanceCol}>
                  <span className={styles.label}>Balance</span>
                  <span className={styles.balance}>{`RD$${numeral(
                    amount.toFixed(2)
                  ).format("0,0.00")}`}</span>
                </span>
              </span>
            </li>
          </ul>
        ) : (
          <Shared.Alert
            className="info"
            text="No tienes cuentas activas. Para más información, consulta el
Historial."
          />
        )}
      </div>
    </>
  );
}
