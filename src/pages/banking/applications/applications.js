import styles from "./applications.module.scss";
import { BankingLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import classNames from "classnames";

export default function BankingApplicationsPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <BankingLayout title="Solicitudes">
        <div className={styles.bankingApplications}>Solicitudes</div>
      </BankingLayout>
    </>
  );
}
