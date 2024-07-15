import styles from "./AppModal.module.scss";
import { Modal } from "semantic-ui-react";

export function AppModal(props) {
  const { children, show, onClose = null, title, width } = props;

  return (
    <Modal
      open={show}
      onClose={onClose}
      size="small"
      style={{ width: `${width}px` }}
      className={styles.modal}
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
