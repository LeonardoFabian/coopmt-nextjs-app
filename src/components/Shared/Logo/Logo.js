import styles from "./Logo.module.scss";
import Link from "next/link";
import { Image } from "../Image";
import { Option } from "@/api";
import { useState, useEffect } from "react";

const optionController = new Option();

export function Logo(props) {
  const { width = 196, height = 80, dark = false, className = "" } = props;
  const [option, setOption] = useState(null);

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
  const logoDarkUrl = option?.attributes?.logoDark?.data
    ? option?.attributes?.logoDark?.data?.attributes?.url
    : "/images/logo-dark.svg";
  const logoAlt =
    option?.attributes?.logo?.data?.attributes?.alternativeText ?? "Logo";

  return (
    <>
      {dark ? (
        <Link href={"/"} className={styles.logo}>
          <Image
            src={logoDarkUrl}
            alt={logoAlt}
            height={height}
            width={width}
          />
        </Link>
      ) : (
        <Link href={"/"} className={styles.logo}>
          <Image
            src={logoUrl}
            alt={logoAlt}
            height={height}
            width={width}
            className={className}
          />
        </Link>
      )}
    </>
  );
}
