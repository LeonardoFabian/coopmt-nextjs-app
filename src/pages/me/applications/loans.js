import { MeLayout, ApplicationsLayout } from "@/layouts";
import styles from "./applications.module.scss";

export default function MeLoansRequestPage() {
  return (
    <MeLayout title="Solicitudes">
      <ApplicationsLayout title="Préstamos">
        <div className={styles.applications}>Prestamos</div>
      </ApplicationsLayout>
    </MeLayout>
  );
}
