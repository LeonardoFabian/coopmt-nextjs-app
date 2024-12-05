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

      <Container fluid className={styles.main}>
        <div className={classNames({ [styles.relative]: relative })}>
          {isContainer ? <Container>{children}</Container> : children}
        </div>
      </Container>

      {/* Footer */}
      <Footer data={data?.footer} />
    </>
  );
}
