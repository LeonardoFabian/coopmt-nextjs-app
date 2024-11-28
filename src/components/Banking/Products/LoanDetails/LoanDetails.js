import styles from "./LoanDetails.module.scss";
import { useAuth } from "@/hooks";
import { AmortizationSchedule } from "./AmortizationSchedule";
import { NextPaymentInfoBar } from "./NextPaymentInfoBar";
import { LoanData } from "./LoanData";
import { useRouter } from "next/router";
import { use, useEffect } from "react";

export function LoanDetails(props) {
  const { loanId } = props;
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const loan = {
    loanId: loanId,
  };

  return (
    <div className={styles.loanDetails}>
      <NextPaymentInfoBar loan={loan} />
      <LoanData loan={loan} />
      <div className={styles.loanAmortizationSchedule}>
        <AmortizationSchedule loan={loan} />
      </div>
    </div>
  );
}
