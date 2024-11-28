import styles from "./LoanData.module.scss";
import { fn } from "@/utils";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { Loan } from "@/api";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

const loanController = new Loan();

export function LoanData(props) {
  const { loan } = props;
  console.log("LoanData loan: ", loan);
  const { user } = useAuth();
  const router = useRouter();
  const [loanData, setLoanData] = useState(null);
  const [amortizationData, setAmortizationData] = useState(null);

  //   useEffect(() => {
  //     if (!user) {
  //       router.push("/");
  //     }
  //   }, []);

  useEffect(() => {
    if (loan) {
      (async () => {
        try {
          // loan details
          const loanDataResponse = await loanController.getLoanDetails(
            loan.loanId
          );
          console.log("loanDataResponse: ", loanDataResponse);
          setLoanData(loanDataResponse?.data);

          //   amortization info
          const amortizationDataResponse =
            await loanController.getLoanAmortizationSchedule(loan.loanId);
          console.log(
            "amortizationDataResponse: ",
            amortizationDataResponse?.data
          );
          setAmortizationData(amortizationDataResponse?.data);
        } catch (error) {
          console.log("Error getting loan data: ", error);
        }
      })();
    }
  }, []);

  const groupAmortizationData = (data) => {
    let groupedAmortizationData = {
      capital: 0,
      interest: 0,
      capitalBalance: 0,
      interestBalance: 0,
    };

    data?.forEach((item) => {
      groupedAmortizationData.capital += item?.installmentPrincipalAmount || 0;
      groupedAmortizationData.interest += item?.installmentInterestAmount || 0;
      groupedAmortizationData.capitalBalance +=
        item?.installmentPrincipalBalance || 0;
      groupedAmortizationData.interestBalance +=
        item?.installmentInterestBalance || 0;
    });

    return groupedAmortizationData;
  };

  if (loanData && amortizationData) {
    const paymentData = amortizationData
      ? groupAmortizationData(amortizationData)
      : null;

    const loanId = loanData ? loanData?.number : 0;
    const amount = loanData ? loanData?.amount : 0;
    const type = loanData ? loanData?.type : "Préstamo";
    const disbursementDate = loanData ? loanData?.disbursementDate : null;
    const maturityDate = loanData ? loanData?.maturityDate : null;
    const installments = loanData ? loanData?.installments : 0;
    const monthlyInterestRate = loanData ? loanData?.monthlyInterestRate : 0;
    const monthlyInstallmentAmount = loanData
      ? loanData?.monthlyInstallmentAmount
      : 0;
    const capital = paymentData ? paymentData?.capital : 0;
    const capitalBalance = paymentData ? paymentData?.capitalBalance : 0;
    const interest = paymentData ? paymentData?.interest : 0;
    const interestBalance = paymentData ? paymentData?.interestBalance : 0;

    return (
      <div className={styles.loanData}>
        {loanData && amortizationData && (
          <div className={styles.loanDataWrapper}>
            <h5 className={styles.title}>Detalles del Préstamo</h5>

            <div className={styles.loanDataContent}>
              {/* No. prestamo */}
              <div className={styles.loanAmount}>
                <span className={styles.label}>No. Préstamo</span>
                <p className={styles.value}>{`#${loanId}`}</p>
              </div>
              {/* Tipo prestamo */}
              <div className={styles.loanAmount}>
                <span className={styles.label}>Tipo de Préstamo</span>
                <p className={styles.value}>{type}</p>
              </div>
              {/* Fecha desembolso */}
              <div className={styles.loanAmount}>
                <span className={styles.label}>Fecha Desembolso</span>
                <p className={styles.value}>
                  {fn.formatDate(disbursementDate)}
                </p>
              </div>
              {/* Fecha vencimiento */}
              <div className={styles.loanAmount}>
                <span className={styles.label}>Fecha Vencimiento</span>
                <p className={styles.value}>{fn.formatDate(maturityDate)}</p>
              </div>
              {/* monto del prestamo */}
              <div className={styles.loanAmount}>
                <span className={styles.label}>Monto Desembolsado</span>
                <p className={styles.value}>{`RD$${numeral(
                  amount.toFixed(2)
                ).format("0,0.00")}`}</p>
              </div>
              {/* cuotas */}
              <div className={styles.loanAmount}>
                <span className={styles.label}>No. Cuotas</span>
                <p className={styles.value}>{installments}</p>
              </div>
              {/* tasa de interes */}
              <div className={styles.loanAmount}>
                <span className={styles.label}>Tasa de Interés</span>
                <p className={styles.value}>{`${monthlyInterestRate}%`}</p>
              </div>
              {/* cuota mensual */}
              <div className={styles.loanMonthlyInstallment}>
                <span className={styles.label}>Cuota Mensual</span>
                <p className={styles.value}>{`RD$${numeral(
                  monthlyInstallmentAmount?.toFixed(2)
                ).format("0,0.00")}`}</p>
              </div>
              {/* capital */}
              <div className={styles.loanMonthlyInstallment}>
                <span className={styles.label}>Capital</span>
                <p className={styles.value}>{`RD$${numeral(
                  capital?.toFixed(2)
                ).format("0,0.00")}`}</p>
              </div>
              {/* balance capital */}
              <div className={styles.loanMonthlyInstallment}>
                <span className={styles.label}>Bce. Capital</span>
                <p className={styles.value}>{`RD$${numeral(
                  capitalBalance?.toFixed(2)
                ).format("0,0.00")}`}</p>
              </div>
              {/* interes */}
              <div className={styles.loanMonthlyInstallment}>
                <span className={styles.label}>Interés</span>
                <p className={styles.value}>{`RD$${numeral(
                  interest?.toFixed(2)
                ).format("0,0.00")}`}</p>
              </div>
              {/* balance interes */}
              <div className={styles.loanMonthlyInstallment}>
                <span className={styles.label}>Bce. Interés</span>
                <p className={styles.value}>{`RD$${numeral(
                  interestBalance?.toFixed(2)
                ).format("0,0.00")}`}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
