import styles from "./AddAddress.module.scss";
import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { AddressForm } from "../AddressForm";

export function AddAddress(props) {
  const { onReload } = props;

  const [showModal, setShowModal] = useState(false);
  // console.log(showModal);

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Button primary className={styles.addBtn} onClick={handleShowModal}>
        <Icon name="plus" /> Añadir dirección
      </Button>

      {/* modal */}
      <Shared.AppModal
        show={showModal}
        onClose={handleShowModal}
        title="Añadir dirección"
      >
        <AddressForm onClose={handleShowModal} onReload={onReload} />
      </Shared.AppModal>
    </>
  );
}
