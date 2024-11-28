import styles from "./account.module.scss";
import { MeLayout, AccountSettingsLayout } from "@/layouts";
import { User } from "@/components/Account";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function ContactPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <MeLayout title="Mi Cuenta">
      <AccountSettingsLayout title="Contacto">
        <div className={styles.phonePage}>
          <User.Contact />
        </div>
      </AccountSettingsLayout>
    </MeLayout>
  );
}
