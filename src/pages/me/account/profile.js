import styles from "./account.module.scss";
import { MeLayout, AccountSettingsLayout } from "@/layouts";
import { User } from "@/components/Account";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <MeLayout title="Mi Cuenta">
      <AccountSettingsLayout title="Mi Perfil">
        <div className={styles.profilePage}>
          <User.Profile />
          {/* <User.AccountInfo />
          <User.PersonalInformation
            reload={reload}
            onReload={() => handleReload}
          /> */}
        </div>
      </AccountSettingsLayout>
    </MeLayout>
  );
}
