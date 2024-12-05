import { Shared } from "@/components/Shared";
import { Account } from "../Account";
import { Menu } from "../Menu";
import { useState, useEffect } from "react";
import { MenuResponsive } from "../MenuResponsive";
import styles from "./TopBar.module.scss";

export function TopBar(props) {
  const { isOpenSearch, data } = props;

  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // detect mobile or tablet screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768); // change to true if you want to show the menu on mobile screens
    };

    handleResize(); // call once on component mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // detect scroll
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

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isPageScrolled]);

  return (
    <>
      <header className={styles.topBar}>
        <div className={styles.left}>
          <Shared.Logo
            image={data?.logo}
            text={data?.siteTitle}
            link={data?.logoUrl}
          />
        </div>

        <div className={styles.right}>
          {isMobileScreen ? (
            <div className={styles.menuResponsive}>
              <MenuResponsive isOpenSearch={isOpenSearch} data={data} />
            </div>
          ) : (
            <div className={styles.menu}>
              <Menu isOpenSearch={isOpenSearch} />
              <Account buttons={data?.buttons} />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
