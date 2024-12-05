import classNames from "classnames";
import Link from "next/link";
import { BrowserRouter } from "react-router-dom";
import styles from "./ApplicationsLayout.module.scss";
// import { Navigation } from "@/routes";
import { Navigation } from "./Navigation";

export function ApplicationsLayout({ children }) {
  return (
    <BrowserRouter>
      <div className={styles.applicationLayout}>
        <Navigation />
        <div className={styles.content}>{children}</div>
      </div>
    </BrowserRouter>
  );
}
