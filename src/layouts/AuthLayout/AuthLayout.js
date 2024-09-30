import styles from "./AuthLayout.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export function AuthLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();

  // if user is authenticated, redirect to home
  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.close}>
            <FontAwesomeIcon
              icon={faClose}
              size="xl"
              inverse
              className="highlight"
            />
          </Link>
          {/* <Link href="/"><Icon name="close" /></Link> */}
        </div>
        <div className={styles.left}>{children}</div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}
