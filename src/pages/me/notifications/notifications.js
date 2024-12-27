import styles from "./notifications.module.scss";
import { MeLayout, NotificationsLayout } from "@/layouts";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { Block } from "@/components/Block";
import { Notification } from "@/api";
import { useState, useEffect } from "react";
import { fn } from "@/utils";
import { useAuth } from "@/hooks";

export default function MeNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  const notificationController = new Notification();

  if (!user) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await notificationController.getUserNotifications(
          user.id
        );
        console.log("User Notifications: ", response);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error al obtener notificaciones: ", error);
      }
    })();
  }, []);

  return (
    <MeLayout title="Notificaciones">
      <NotificationsLayout title="Recibidas">
        <ul className={styles.notifications}>
          {notifications &&
            notifications.map((notification) => {
              const date = fn.formatDate(notification?.attributes?.publishedAt);
              const dateTime = new Date(
                notification?.attributes?.publishedAt
              ).toLocaleString();

              return (
                <li
                  key={notification.id}
                  className={classNames(styles.notification, {
                    [styles.read]: notification.attributes.isRead === true,
                  })}
                >
                  <Link href={`/me/notifications/${notification.id}`}>
                    <p className={styles.sender}>Coopset</p>
                    <h6 className={styles.title}>
                      {notification.attributes.title}
                    </h6>
                    <p className={styles.message}>
                      {notification.attributes.message}
                    </p>
                  </Link>
                  <div>
                    <p>{dateTime}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </NotificationsLayout>
    </MeLayout>
  );
}
