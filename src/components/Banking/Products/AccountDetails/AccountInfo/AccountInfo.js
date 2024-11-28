import styles from "./AccountInfo.module.scss";
import { Account } from "@/api";
import { useEffect, useState } from "react";
import numeral from "numeral";

const accountController = new Account();

export function AccountInfo(props) {
  const { account } = props;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (account) {
      (async () => {
        try {
          const balanceResponse =
            await accountController.getContributionBalance(account.accountId);
          console.log("contributionBalance: ", balanceResponse);
          setBalance(balanceResponse.data.balance);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  return (
    <div className={styles.accountInfo}>
      <div className={styles.accountInfoWrapper}>
        <ul className={styles.accountInfoList}>
          <li>
            <div>
              <label>Cuenta No.</label>
              <span>{account.accountId}</span>
            </div>

            <div>
              <label>Balance</label>
              <span>{`RD$${numeral(balance.toFixed(2)).format(
                "0,0.00"
              )}`}</span>
            </div>
          </li>
          <li>
            <div>
              <label>Tipo</label>
              <span>{account.type}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
