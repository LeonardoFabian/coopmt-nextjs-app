import styles from "./account.module.scss";
import { MeLayout, AccountSettingsLayout } from "@/layouts";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fn } from "@/utils";

export default function MeAccountPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <MeLayout title="Mi Cuenta">
      <AccountSettingsLayout title="Mi Perfil">
        <p>aqui mi perfil</p>
      </AccountSettingsLayout>
    </MeLayout>
  );
}
