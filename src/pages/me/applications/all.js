import styles from "./applications.module.scss";
import { MeLayout, ApplicationsLayout } from "@/layouts";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { Block } from "@/components/Block";
import { useState, useEffect } from "react";
import { fn } from "@/utils";
import { useAuth } from "@/hooks";

export default function MeApplicationsPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <MeLayout title="Solicitudes">
      <ApplicationsLayout title="Solicitudes">
        {/* <div className={styles.applications}>Solicitudes</div> */}
      </ApplicationsLayout>
    </MeLayout>
  );
}
