import styles from "./account.module.scss";
import { MeLayout, AccountSettingsLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { User } from "@/components/Account";

export default function BankAccountsPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <MeLayout title="Mi Cuenta">
      <AccountSettingsLayout title="Cuentas Bancarias">
        <div className={styles.bankAccountsPage}>
          <User.BankAccounts />
        </div>
      </AccountSettingsLayout>
    </MeLayout>
  );
}
