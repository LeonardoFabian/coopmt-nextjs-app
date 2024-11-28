import styles from "./TotalSavingsAndWithdrawals.module.scss";
import { useAuth } from "@/hooks";
import { Account } from "@/api";
import { useEffect, useState } from "react";
import { Block } from "@/components/Block";
import numeral from "numeral";
import { Button } from "semantic-ui-react";

const accountController = new Account();

export function TotalSavingsAndWithdrawals(props) {
  const { user } = useAuth();
  const { account } = props;
  console.log("account: ", account);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  //   if (!user) {
  //     return null;
  //   }

  useEffect(() => {
    if (account) {
      (async () => {
        try {
          const savingsResponse = await accountController.getTotalSavings(
            account.accountId
          );
          console.log("savingsResponse: ", savingsResponse);

          const withdrawalsResponse =
            await accountController.getTotalWithdrawals(account.accountId);
          console.log("withdrawalsResponse: ", withdrawalsResponse);

          setTotalSavings(savingsResponse?.totalSavings?.total);
          setTotalWithdrawals(withdrawalsResponse?.totalWithdrawals?.total);
        } catch (error) {
          console.error(
            "Error during get total savings and withdrawals: ",
            error
          );
        }
      })();
    }
  }, []);

  return (
    <div className={styles.totalSavingsAndWithdrawals}>
      <div className={styles.totalSavingsWrapper}>
        {totalSavings && totalWithdrawals && (
          <ul className={styles.totalSavingsList}>
            <li className={styles.totalSavingsListItem}>
              <div>
                <span className={styles.icon}>
                  <Block.MaterialIcon icon="savings" />
                </span>
                <div>
                  <h5 className={styles.title}>Ahorrado</h5>
                  <span className={styles.totalSavings}>{`RD$${numeral(
                    totalSavings.toFixed(2)
                  ).format("0,0.00")}`}</span>
                  <p>Total de ahorros</p>
                </div>
              </div>
              <span className={styles.button}>
                <Block.MaterialIcon icon="arrow_forward" />
              </span>
            </li>
            <li className={styles.totalWithdrawalsListItem}>
              <div>
                <span className={styles.icon}>
                  <Block.MaterialIcon icon="money_off" />
                </span>
                <div>
                  <h5 className={styles.title}>Retirado</h5>
                  <span className={styles.totalWithdrawals}>
                    {`RD$${numeral(totalWithdrawals.toFixed(2)).format(
                      "0,0.00"
                    )}`}
                  </span>
                  <p>Total de retiros</p>
                </div>
              </div>

              <span className={styles.button}>
                <Block.MaterialIcon icon="arrow_forward" />
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
