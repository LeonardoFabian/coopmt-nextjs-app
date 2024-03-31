import styles from './AddressCard.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { AddressForm } from '../../AddressForm';
import { AppModal, Confirm } from '@/components/Shared';
import { useState } from 'react';
import { Address } from '@/api';

const addressController = new Address();

export function AddressCard(props) {

    const { addressId, address, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleShowModal = () => setShowModal((prevState) => !prevState);
    const handleShowConfirm = () => setShowConfirm((prevState) => !prevState);

    const deleteOnConfirm = async () => {
        try {
            await addressController.delete(addressId);
            onReload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={styles.addressCard}>
                <div>
                    <p>{`${address.address}, ${address.address2 ? address.address2 : '' }`}</p>
                    <p>{`${address.city.data.attributes.name}, ${address.state.data.attributes.name}`}</p>
                    <p>{`${address.country.data.attributes.name}`}</p>
                    <p>{`${address.postalCode}`}</p>
                </div>

                <div className={styles.actions}>
                    <Button icon className={styles.editBtn} onClick={handleShowModal}>
                        <Icon name="edit" /> 
                    </Button>
                    <Button icon className={styles.deleteBtn} onClick={handleShowConfirm}>
                        <Icon name="delete" /> 
                    </Button>
                </div>
            </div>

            {/* modal */}
            <AppModal show={showModal} onClose={handleShowModal} title="Editar dirección">
                <AddressForm 
                    onClose={handleShowModal} 
                    onReload={onReload}
                    addressId={addressId}
                    address={address}
                />
            </AppModal>

            <Confirm 
                open={showConfirm}
                onCancel={handleShowConfirm}
                onConfirm={deleteOnConfirm}
                content="Seguro que quieres eliminar esta dirección?"
            />
        </>
    )
}
