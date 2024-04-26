import styles from "./TopBar.module.scss";
import { Shared } from "@/components/Shared";
import { Account } from "../Account";
import { Menu } from "../Menu";
import { useState, useEffect } from "react";

export function TopBar(props) {
  const { isOpenSearch, data } = props;

  const [isPageScrolled, setIsPageScrolled] = useState(false);

  useEffect(() => {
    const header = document.querySelector("header");

    const checkScroll = () => {
      setIsPageScrolled(window.scrollY !== 0);
      // console.log("SCROLL Y: ", window.scrollY);

      if (window.scrollY > 400) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", checkScroll);
  }, [isPageScrolled]);

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <Shared.Logo
          image={data?.logo}
          text={data?.siteTitle}
          link={data?.logoUrl}
        />
      </div>

      <div className={styles.right}>
        <Menu isOpenSearch={isOpenSearch} />
        <Account buttons={data?.buttons} />
      </div>
    </header>
  );
}
