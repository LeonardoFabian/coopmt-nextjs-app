import styles from './AppModal.module.scss';
import { Modal } from 'semantic-ui-react';

export function AppModal(props) {

    const { children, show, onClose = null, title } = props;

    return (
        <Modal open={show} onClose={onClose} size='small'>
            {title && (<Modal.Header>{ title }</Modal.Header>)}
            <Modal.Content>
                { children }
            </Modal.Content>
        </Modal>
    )
}
