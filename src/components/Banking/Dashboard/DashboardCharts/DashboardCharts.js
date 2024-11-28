import styles from "./DashboardCharts.module.scss";
import { useAuth } from "@/hooks";
import { useAccount } from "@/hooks";
import { ContributionBalanceChart } from "../ContributionBalanceChart";
import { MonthlyDiscountsChart } from "../MonthlyDiscountsChart";

export function DashboardCharts() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.dashboardCharts}>
      <MonthlyDiscountsChart />
      <ContributionBalanceChart />
    </div>
  );
}
