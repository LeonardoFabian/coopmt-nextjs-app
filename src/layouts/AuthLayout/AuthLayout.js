import styles from "./AuthLayout.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Shared } from "@/components/Shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Option } from "@/api";
import { useState, useEffect } from "react";

const optionController = new Option();

export function AuthLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();
  const [option, setOption] = useState(null);

  if (user) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
        console.log("Options: ", response);
        setOption(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const logoUrl =
    option?.attributes?.logo?.data?.attributes?.url ?? "/images/logo.svg";
  const logoAlt =
    option?.attributes?.logo?.data?.attributes?.alternativeText ?? "Logo";

  // console.log("logoUrl: ", logoUrl);

  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link href="/">
            <Shared.Image src={logoUrl} alt={logoAlt} fill />
          </Link>
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
