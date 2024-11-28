import styles from "./account.module.scss";
import { MeLayout, AccountSettingsLayout } from "@/layouts";
import { User } from "@/components/Account";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function AddressPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <MeLayout title="Mi Cuenta">
      <AccountSettingsLayout title="Direcciones">
        <div className={styles.addressPage}>
          <User.Address />
        </div>
      </AccountSettingsLayout>
    </MeLayout>
  );
}
