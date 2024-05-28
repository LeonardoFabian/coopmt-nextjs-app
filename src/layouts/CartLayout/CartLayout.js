import styles from "./CartLayout.module.scss";
import { Footer, TopBar, Cart } from "@/components/Layout";
import { Container } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { Global } from "@/api";
import classNames from "classnames";
import { Shared } from "@/components/Shared";

const globalController = new Global();

export function CartLayout(props) {
  const [global, setGlobal] = useState(null);

  const {
    children,
    isOpenSearch = false,
    isContainer = false,
    relative = false,
  } = props;

  useEffect(() => {
    (async () => {
      try {
        const response = await globalController.find();
        setGlobal(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <TopBar isOpenSearch={isOpenSearch} data={global?.header} />
      <Container fluid>
        <Shared.Separator height={16} />
        <Cart.Header />
        <div className={classNames({ [styles.relative]: relative })}>
          {isContainer ? <Container>{children}</Container> : children}
        </div>
      </Container>

      <Footer data={global?.footer} />
    </>
  );
}
