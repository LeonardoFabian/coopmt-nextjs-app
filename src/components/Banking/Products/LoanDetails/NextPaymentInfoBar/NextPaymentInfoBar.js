import styles from "./NextPaymentInfoBar.module.scss";
import { fn } from "@/utils";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { Loan } from "@/api";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

const loanController = new Loan();

export function NextPaymentInfoBar(props) {
  const { loan } = props;
  console.log("loan: ", loan);
  const { user } = useAuth();
  const router = useRouter();
  //   console.log(router.pathname);

  const [nextPaymentInfo, setNextPaymentInfo] = useState(null);

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []);

  useEffect(() => {
    if (loan) {
      (async () => {
        try {
          const nextPaymentResponse =
            await loanController.getLoanNextInstallmentDetails(loan?.loanId);
          console.log("nextPaymentResponse: ", nextPaymentResponse);
          setNextPaymentInfo(nextPaymentResponse?.data);
        } catch (error) {
          console.error("Error getting next payment info: ", error);
        }
      })();
    }
  }, []);

  const formattedNextPaymentDate = fn.formatDate(
    nextPaymentInfo?.installmentDate
  );
  const calculatedNextPaymentAmount = fn.calcSingleLoanInstallmentTotalAmount(
    nextPaymentInfo?.installmentPrincipalAmount,
    nextPaymentInfo?.installmentInterestAmount
  );
  const formattedNextPaymentAmount = `RD$${numeral(
    calculatedNextPaymentAmount?.toFixed(2)
  ).format("0,0.00")}`;

  return (
    <>
      {nextPaymentInfo &&
        formattedNextPaymentAmount &&
        formattedNextPaymentDate && (
          <div className={styles.nextPaymentInfoBar}>
            <div className={styles.nextPaymentInfoBarWrapper}>
              El pago correspondiente a la cuota No.{" "}
              <span className={styles.nextPaymentInstallmentNumber}>
                {nextPaymentInfo?.installmentNumber}
              </span>{" "}
              de{" "}
              <span className={styles.nextPaymentAmount}>
                {formattedNextPaymentAmount}
              </span>{" "}
              se realizará el{" "}
              <span className={styles.nextPaymentDate}>
                {formattedNextPaymentDate}
              </span>{" "}
            </div>
          </div>
        )}
    </>
  );
}
