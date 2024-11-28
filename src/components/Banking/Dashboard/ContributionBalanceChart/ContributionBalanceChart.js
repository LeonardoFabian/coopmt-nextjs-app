import styles from "./ContributionBalanceChart.module.scss";
import { useAuth } from "@/hooks";
import { useAccount } from "@/hooks";
import { useRouter } from "next/router";
import { Custom } from "@/components/Custom";
import { useEffect, useState } from "react";
import { Account } from "@/api";
import numeral from "numeral";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

const accountController = new Account();

/**
 * Componente para mostrar un grafico que representa el total de ahorros y
 * retiros del socio.
 *
 * @returns {JSX.Element}
 */
export function ContributionBalanceChart() {
  const { user } = useAuth();
  const router = useRouter();
  // const { contributionTotalSavings, contributionTotalWithdrawals } = useAccount();
  const [contributionTotalSavings, setContributionTotalSavings] = useState(0);
  const [contributionTotalWithdrawals, setContributionTotalWithdrawals] =
    useState(0);

  let data = {};

  if (!user) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const contributionTotalSavingsResponse =
            await accountController.getTotalSavings(user.memberId);
          console.log(
            "contributionTotalSavingsResponse: ",
            contributionTotalSavingsResponse
          );
          setContributionTotalSavings(
            contributionTotalSavingsResponse?.totalSavings
          );

          const contributionTotalWithdrawalsResponse =
            await accountController.getTotalWithdrawals(user.memberId);
          console.log(
            "contributionTotalWithdrawalsResponse: ",
            contributionTotalWithdrawalsResponse
          );
          setContributionTotalWithdrawals(
            contributionTotalWithdrawalsResponse?.totalWithdrawals
          );
        } catch (error) {
          console.error(
            "Error retrieving total savings and withdrawals: ",
            error
          );
        }
      })();
    }
  }, []);

  // console.log("contributionTotalSavings: ", contributionTotalSavings);
  // console.log("contributionTotalWithdrawals: ", contributionTotalWithdrawals);

  if (
    contributionTotalSavings !== null &&
    contributionTotalWithdrawals !== null
  ) {
    const savings = contributionTotalSavings?.total;
    const withdrawals = contributionTotalWithdrawals?.total;

    // console.log("savings: ", savings);
    // console.log("withdrawals: ", withdrawals);

    // return;

    data = {
      labels: ["Ahorros", "Retiros"],
      datasets: [
        {
          label: "Total",
          data: [savings, withdrawals],
          backgroundColor: ["rgb(58, 181, 74)", "rgba(238, 42, 36, 0.2)"],
          borderColor: ["rgb(161, 218, 166)", "rgba(238, 42, 36, 1)"],
          borderWidth: 1,
        },
      ],
    };
  }
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //     tooltip: {
  //       mode: 'index',
  //       intersect: false,
  //     },
  //   },
  //   scales: {
  //     x: {
  //       type: 'time', // Manejo de fechas
  //     },
  //   },

  return (
    <>
      <div className={styles.contributionBalanceChart}>
        {contributionTotalSavings && contributionTotalWithdrawals && (
          <Custom.Chartjs2Doughnut data={data} title="Ahorros y Retiros" />
        )}
      </div>
    </>
  );
}
