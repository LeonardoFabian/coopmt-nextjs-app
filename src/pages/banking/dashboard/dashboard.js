import styles from "./dashboard.module.scss";
import { BankingLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Dashboard } from "@/components/Banking";

export default function BankingDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <BankingLayout title="Dashboard">
        <div className={styles.bankingDashboard}>
          <Dashboard.DashboardCardGrid />
          <Dashboard.DashboardCharts />
        </div>
      </BankingLayout>
    </>
  );
}
