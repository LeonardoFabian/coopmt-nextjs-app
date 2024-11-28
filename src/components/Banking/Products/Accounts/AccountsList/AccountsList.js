import { Shared } from "@/components/Shared";
import styles from "./AccountsList.module.scss";
import numeral from "numeral";
import { useRouter } from "next/router";

export function AccountsList(props) {
  const { user, accounts } = props;
  const router = useRouter();
  console.log("accountsList accounts: ", accounts);

  const amount = accounts?.data ? accounts?.data["balance"] : 0;
  const account = user;
  const type = `Cuenta de Aportaciones`;

  const handleAccountClick = () => {
    router.push(`/banking/products/accounts/${account.memberId}`);
  };

  return (
    <>
      <div className={styles.accountsList}>
        {amount ? (
          <ul className={styles.accountsListWrapper}>
            <li
              className={styles.accountsListItem}
              onClick={() => handleAccountClick(account.memberId)}
            >
              <span className={styles.accountsListLeft}>
                <span className={styles.numberCol}>
                  <span className={styles.label}>No.</span>
                  <span
                    className={styles.number}
                  >{`*${account.memberId}`}</span>
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
            text="No tienes cuentas activas o no hemos podido establecer comunicación con el servidor. Por favor, actualiza la página o intenta mas tarde."
          />
        )}
      </div>
    </>
  );
}
