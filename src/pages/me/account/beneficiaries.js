import styles from "./account.module.scss";
import { MeLayout, AccountSettingsLayout } from "@/layouts";
import { User } from "@/components/Account";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function BeneficiariesPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <MeLayout title="Mi Cuenta">
      <AccountSettingsLayout title="Beneficiarios">
        <div className={styles.beneficiariesPage}>
          <User.Beneficiaries />
        </div>
      </AccountSettingsLayout>
    </MeLayout>
  );
}