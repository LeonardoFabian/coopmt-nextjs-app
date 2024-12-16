import { MeLayout, ApplicationsLayout } from "@/layouts";
import styles from "./applications.module.scss";

export default function MeQuotationsRequestPage() {
  return (
    <MeLayout title="Solicitudes">
      <ApplicationsLayout title="Cotizaciones"></ApplicationsLayout>
    </MeLayout>
  );
}
