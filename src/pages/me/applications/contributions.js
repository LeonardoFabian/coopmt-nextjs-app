import { MeLayout, ApplicationsLayout } from "@/layouts";
import styles from "./applications.module.scss";

export default function MeContributionsChangeRequestPage() {
  return (
    <MeLayout title="Solicitudes">
      <ApplicationsLayout title="Cambio de Aportes">
        <div className={styles.applications}>Cambio de AportesSS</div>
      </ApplicationsLayout>
    </MeLayout>
  );
}
