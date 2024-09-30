import styles from "./banking.module.scss";
import { BankingLayout } from "@/layouts";
// import { AccountProvider } from "@/contexts";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import classNames from "classnames";

export default function BankingPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <BankingLayout title="Dashboard">
        <div className={styles.banking}>Banking</div>
      </BankingLayout>
    </>
  );
}
