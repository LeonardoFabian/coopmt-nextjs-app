import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import { Notification } from "@/api";
import { Block } from "@/components/Block";

const notificationController = new Notification();

export function NotificationToast() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const notificationsResponse =
            await notificationController.getUserNotifications(user.id);
          const unreadNotifications = notificationsResponse.data.filter(
            (n) => !n.attributes.isRead
          );

          unreadNotifications.forEach((notification) => {
            toast.info(
              `Tienes una una notificación sin leer: ${notification.attributes.title}`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );
          });
        } catch (error) {
          console.log("Error fetching notifications: ", error);
        }
      })();
    }
  }, [user]);

  return null;
}
