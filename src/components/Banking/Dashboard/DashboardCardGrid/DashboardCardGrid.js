import styles from "./DashboardCardGrid.module.scss";
import { useAuth } from "@/hooks";
import { useAccount } from "@/hooks";
import { Custom } from "@/components/Custom";
import numeral from "numeral";
import { fn } from "@/utils";
import { useState, useEffect } from "react";
import { Account, Loan } from "@/api";
import { last } from "lodash";
import { Block } from "@/components/Block";

const accountController = new Account();
const loanController = new Loan();

export function DashboardCardGrid() {
  const { user } = useAuth();
  const [contributionBalance, setContributionBalance] = useState(0);
  const [activeLoans, setActiveLoans] = useState(0);
  const [lastTwoMonthContributionAmount, setLastTwoMonthContributionAmount] =
    useState(0);
  const [lastTwoMonthLoansAmount, setLastTwoMonthLoansAmount] = useState(0);
  const [nextInstallmentDetails, setNextInstallmentDetails] = useState(null);
  // const { contributionBalance, activeLoans } = useAccount();

  console.log("dashboard contributionBalance: ", contributionBalance);
  console.log("dashboard activeLoans: ", activeLoans);

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          // get contributions balance
          const contributionBalanceResponse =
            await accountController.getContributionBalance(user.memberId);
          console.log("contributionBalance: ", contributionBalanceResponse);
          setContributionBalance(contributionBalanceResponse);

          // get active loans
          const activeLoansResponse = await loanController.getUserActiveLoans(
            user.memberId
          );
          console.log("activeLoans: ", activeLoansResponse);
          setActiveLoans(activeLoansResponse);

          // get last two month contribution amount
          const lastTwoMonthContributionAmountResponse =
            await accountController.getLastTwoMonthTotalContributionAmount(
              user.memberId
            );
          console.log(
            "lastTwoMonthContributionAmount: ",
            lastTwoMonthContributionAmountResponse
          );
          setLastTwoMonthContributionAmount(
            lastTwoMonthContributionAmountResponse
          );

          // get last two month loans amount
          const lastTwoMonthLoansAmountResponse =
            await loanController.getLastTwoMonthTotalLoansAmount(user.memberId);
          console.log(
            "lastTwoMonthLoansAmount: ",
            lastTwoMonthLoansAmountResponse
          );
          setLastTwoMonthLoansAmount(lastTwoMonthLoansAmountResponse);

          // get the TOP 1 next installment details
          const nextInstallmentDetailsResponse =
            await loanController.getMemberLoansNextInstallmentDetails(
              user.memberId
            );
          console.log(
            "nextInstallmentDetails: ",
            nextInstallmentDetailsResponse
          );
          setNextInstallmentDetails(nextInstallmentDetailsResponse?.data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  // get last two month values
  const [currentMonthContributions, previousMonthContributions] =
    lastTwoMonthContributionAmount?.data || [0, 0];
  const [currentMonthLoans, previousMonthLoans] =
    lastTwoMonthLoansAmount?.data || [0, 0];

  // calculate percentage difference between current month and previous month
  const contributionsPercentageDifference =
    fn.calcLastTwoMonthsTotalAmountPercentageDifference(
      currentMonthContributions?.amount,
      previousMonthContributions?.amount
    );
  const loansPercentageDifference =
    fn.calcLastTwoMonthsTotalAmountPercentageDifference(
      currentMonthLoans?.amount,
      previousMonthLoans?.amount
    );

  // format account total balance
  const accountsTotalBalance = `RD$${numeral(
    contributionBalance?.data?.balance?.toFixed(2)
  ).format("0,0.00")}`;

  // format loans total balance
  const calculatedLoansTotalBalance = fn.calcLoansTotalBalance(activeLoans);
  const loansTotalBalance = `RD$${numeral(
    calculatedLoansTotalBalance?.toFixed(2)
  ).format("0,0.00")}`;

  // format last month contribution amount
  const lastTwoMonthContributionAmountFormatted = `RD$${numeral(
    currentMonthContributions?.amount?.toFixed(2)
  ).format("0,0.00")}`;

  // format last month loans amount
  const lastMonthLoansAmountFormatted = `RD$${numeral(
    currentMonthLoans?.amount?.toFixed(2)
  ).format("0,0.00")}`;

  // calculate next loan TOP 1 installment total amount
  const nextLoanInstallmentTotalAmount =
    fn.calcSingleLoanInstallmentTotalAmount(
      nextInstallmentDetails?.installmentPrincipalAmount,
      nextInstallmentDetails?.installmentInterestAmount
    );
  // format next loan installment total amount
  const nextLoanInstallmentTotalAmountFormatted = `RD$${numeral(
    nextLoanInstallmentTotalAmount?.toFixed(2)
  ).format("0,0.00")}`;
  const nextLoanInstallmentDateFormatted = fn.formatDate(
    nextInstallmentDetails?.installmentDate
  );

  const activeApplicationsRequest = 0;

  // const loansTotalBalance = 0;

  const cards = [
    {
      subtitle: "Balance en Cuentas",
      text: accountsTotalBalance,
      chipContent: `+ ${lastTwoMonthContributionAmountFormatted}`,
      chipType: "success",
      chipCaption: "Último mes",
      chipDescriptionContent:
        contributionsPercentageDifference.status === "+"
          ? `${contributionsPercentageDifference.percentage}%`
          : contributionsPercentageDifference.status === "-"
          ? `${contributionsPercentageDifference.percentage}%`
          : `${contributionsPercentageDifference.percentage}%`,
      chipDescriptionCaption:
        contributionsPercentageDifference.status === "+"
          ? "más que mes anterior"
          : contributionsPercentageDifference.status === "-"
          ? "menos que mes anterior"
          : "igual que mes anterior",
      chipDescriptionType:
        contributionsPercentageDifference.status === "+"
          ? "success"
          : contributionsPercentageDifference.status === "-"
          ? "danger"
          : "info",
      chipDescriptionIcon:
        contributionsPercentageDifference.status === "+"
          ? "trending_up"
          : contributionsPercentageDifference.status === "-"
          ? "trending_down"
          : "drag_handle",
      caption: "Total disponible en cuentas.",
    },
    {
      subtitle: "Préstamos Activos",
      text: loansTotalBalance,
      chipContent: `- ${lastMonthLoansAmountFormatted}`,
      chipType: "danger",
      chipCaption: "Último mes",
      chipDescriptionContent:
        loansPercentageDifference.status === "+"
          ? `${loansPercentageDifference.percentage}%`
          : loansPercentageDifference.status === "-"
          ? `${loansPercentageDifference.percentage}%`
          : `${loansPercentageDifference.percentage}%`,
      chipDescriptionCaption:
        loansPercentageDifference.status === "+"
          ? "más que mes anterior"
          : loansPercentageDifference.status === "-"
          ? "menos que mes anterior"
          : "igual que mes anterior",
      chipDescriptionType:
        loansPercentageDifference.status === "+"
          ? "success"
          : loansPercentageDifference.status === "-"
          ? "danger"
          : "info",
      chipDescriptionIcon:
        loansPercentageDifference.status === "+"
          ? "trending_up"
          : loansPercentageDifference.status === "-"
          ? "trending_down"
          : "drag_handle",
      caption: "Total pendiente en préstamos.",
    },
    {
      subtitle: "Próxima Cuota",
      text: nextLoanInstallmentTotalAmountFormatted,
      chipContent: nextInstallmentDetails?.loanNumber,
      chipType: "warning",
      chipCaption: "Número de Préstamo",
      chipDescriptionIcon: "calendar_month",
      chipDescriptionContent: fn.toUpper(nextLoanInstallmentDateFormatted),
      chipDescriptionType: "info",
      caption: "Total próxima cuota a pagar.",
    },
    {
      subtitle: "Solicitudes Activas",
      text:
        activeApplicationsRequest == 1
          ? `${activeApplicationsRequest} Solicitud`
          : `${activeApplicationsRequest} Solicitudes`,
      caption: "Solicitudes en revisión.",
    },
  ];

  return (
    <div className={styles.dashboardCardGrid}>
      {cards &&
        cards.map((card, i) => (
          <Custom.MuiXCardPaper
            key={`card-${i}`}
            subtitle={card.subtitle}
            text={card.text}
            chipContent={card.chipContent}
            chipType={card.chipType}
            chipCaption={card.chipCaption}
            chipDescriptionContent={card.chipDescriptionContent}
            chipDescriptionCaption={card.chipDescriptionCaption}
            chipDescriptionType={card.chipDescriptionType}
            chipDescriptionIcon={card.chipDescriptionIcon}
            caption={card.caption}
          />
        ))}
    </div>
  );
}
