import styles from "./me.module.scss";
import { MeLayout } from "@/layouts";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import classNames from "classnames";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function MePage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const name = `${user?.firstName} ${user?.lastName}`;
  const memberId = user?.memberId;
  const userGender = user?.gender?.name;

  return (
    <>
      <Shared.Seo title="Mi Perfil" />
      <MeLayout>
        <div className={classNames(styles.me)}>
          <div className={styles.mainContentLeft}>
            <div className={styles.card}>
              <div className={styles.meSavingStatics}>
                <div className={styles.cardHeader}>
                  <div className={styles.title}>
                    <Block.MaterialIcon icon="insert_chart" />
                    <h6>Estadísticas</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mainContentRight}>
            <div className={styles.meContent}>
              <div className={styles.card}>
                <div className={styles.title}>
                  <div
                    className={classNames(styles.cardHeader, [
                      styles.flexStart,
                    ])}
                  >
                    <div className={styles.userProfile}>
                      <img
                        className={styles.avatar}
                        src="/images/avatar.svg"
                        alt="Avatar"
                        width={100}
                      />
                      <h6>{name}</h6>
                      {userGender && (
                        <span className={styles.gender}>{userGender}</span>
                      )}
                    </div>
                    {memberId && (
                      <span className={styles.memberId}>{memberId}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MeLayout>
    </>
  );
}
