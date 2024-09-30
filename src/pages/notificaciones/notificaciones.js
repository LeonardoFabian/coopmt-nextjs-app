import styles from "./notificaciones.module.scss";
import { MeLayout, NotificationsLayout } from "@/layouts";
import { Notification } from "@/api";
import { useState, useEffect } from "react";
import { Shared } from "@/components/Shared";
import { useRouter } from "next/router";
import { fn } from "@/utils";
import Link from "next/link";

const notificationController = new Notification();

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await notificationController.getPublicNotifications();
        console.log("Public Notifications: ", response);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error al obtener notificaciones: ", error);
      }
    })();
  }, []);

  return (
    <>
      <Shared.Seo title="Notificaciones" />
      <MeLayout title="Notificaciones">
        <NotificationsLayout title="Principal">
          <ul className={styles.notifications}>
            {notifications &&
              notifications.map((notification) => {
                const date = fn.formatDate(
                  notification?.attributes?.publishedAt
                );

                return (
                  <li key={notification.id} className={styles.notification}>
                    <Link href={`/me/notifications/${notification.id}`}>
                      <h6>{notification.attributes.title}</h6>
                    </Link>
                    <div>
                      <p>{date}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </NotificationsLayout>
      </MeLayout>
    </>
  );
}
