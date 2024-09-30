import styles from "./history.module.scss";
import { BankingLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import classNames from "classnames";

export default function BankingHistoryPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <BankingLayout title="Historial de Movimientos">
        <div className={styles.bankingTransactionsHistory}>
          Listado de movimientos
        </div>
      </BankingLayout>
    </>
  );
}
