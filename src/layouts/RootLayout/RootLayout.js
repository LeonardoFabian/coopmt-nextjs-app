import styles from "./RootLayout.module.scss";
import classNames from "classnames";
import { Container } from "semantic-ui-react";
import { Footer, TopBar, MessageBar } from "@/components/Layout";
import { Global } from "@/api";
import { useState, useEffect } from "react";
import search from "@/pages/search";

const globalController = new Global();

export function RootLayout(props) {
  const [data, setData] = useState(null);
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

  useEffect(() => {
    (async () => {
      try {
        const response = await globalController.find();
        console.log("Global data: ", response);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // if isOpenSearch is true, the search bar is open
  // if isContainer is true, the children are wrapped in a container
  // if relative is true, the children are wrapped in a relative container
  const {
    children,
    isOpenSearch = false,
    isContainer = false,
    relative = false,
  } = props;

  return (
    <>
      {/* <MessageBar /> */}
      {/* TopBar */}
      <TopBar isOpenSearch={isOpenSearch} data={data?.header} />

      <main
        className={classNames(styles.main, {
          ["ui"]: !isMobileScreen,
          ["fluid"]: !isMobileScreen,
          ["container"]: !isMobileScreen,
        })}
      >
        <div className={classNames({ [styles.relative]: relative })}>
          {isContainer && !isMobileScreen ? (
            <Container>{children}</Container>
          ) : (
            children
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer data={data?.footer} />
    </>
  );
}
