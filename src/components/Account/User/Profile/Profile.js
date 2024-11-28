import { PersonalInformation } from "../PersonalInformation";
import { AccountInfo } from "../AccountInfo";
import styles from "./Profile.module.scss";
import { useState } from "react";

export function Profile() {
  const [reload, setReload] = useState(false);

  const handleReload = () => setReload((prevState) => !prevState);

  return (
    <>
      <AccountInfo />
      <PersonalInformation reload={reload} onReload={handleReload} />
    </>
  );
}
