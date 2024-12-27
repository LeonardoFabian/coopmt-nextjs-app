import styles from "./CookieConsentOptions.module.scss";
import Cookies from "js-cookie";
import { Container } from "semantic-ui-react";
import Link from "next/link";
import { ENV } from "@/utils";
import { useAuth } from "@/hooks";

export function CookieConsentOptions({
  content,
  isLoggedIn,
  onAccept,
  onReject,
  updateConsent,
  isVisible,
  setIsVisible,
}) {
  const { user } = useAuth();
  console.log("CookieConsentOptions Content: ", content);

  const handleAccept = async () => {
    Cookies.set(`${ENV.COOKIE_CONSENT_NAME}`, "accepted", { expires: 365 }); // valida por un año
    setIsVisible(false);
    onAccept();

    if (isLoggedIn) {
      await updateConsent("accepted");
    }

    if (user && typeof window.gtag === "function") {
      window.gtag("event", "cookie_policy_consent", {
        user_id: user.id,
        cookie_consent: "accepted",
      });
    } else {
      window.gtag("event", "cookie_policy_consent", {
        user_id: "anonymous",
        cookie_consent: "accepted",
      });
    }
  };

  const handleReject = async () => {
    Cookies.set(`${ENV.COOKIE_CONSENT_NAME}`, "rejected", { expires: 365 }); // valida por un año
    setIsVisible(false);
    onReject();

    if (isLoggedIn) {
      await updateConsent("rejected");
    }

    if (user && typeof window.gtag === "function") {
      window.gtag("event", "cookie_policy_consent", {
        user_id: user.id,
        cookie_consent: "rejected",
      });
    } else {
      window.gtag("event", "cookie_policy_consent", {
        user_id: "anonymous",
        cookie_consent: "rejected",
      });
    }
  };

  return (
    <div className={styles.cookieConsentOptions}>
      {content && content.text && <p>{content.text}</p>}
      <div className={styles.footer}>
        <div className={styles.actions}>
          <button className="add_button" onClick={handleAccept}>
            {content?.acceptButtonText || "Aceptar"}
          </button>
          <button className="edit_button" onClick={handleReject}>
            {content?.rejectButtonText || "Rechazar"}
          </button>
        </div>
        {content?.policyLink && (
          <Link href={content?.policyLink}>
            {content?.policyLinkText || "Ver Política de Cookies"}
          </Link>
        )}
      </div>
    </div>
  );
}
