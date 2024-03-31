import styles from './AddressList.module.scss';
import { useState, useEffect } from 'react';
import { Address } from '@/api';
import { useAuth } from '@/hooks';
import { map } from 'lodash';
import { AddressCard } from './AddressCard';

const addressController = new Address();

export function AddressList(props) {

    const { user } = useAuth();
    const { reload, onReload } = props;

    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await addressController.getAll(user.id);
                console.log("USER ADDRESS LIST: ", response);
                setAddresses(response.data);
            } catch (error) {
                console.error("ADDRESS LIST ERROR: ", error);
            }
        })()
    }, [reload]);

    if(!addresses) return null;

    return (
        <div className={styles.addressList}>
            {map(addresses, (address) => (
                <AddressCard 
                    key={address.id} 
                    addressId={address.id} 
                    address={address.attributes} 
                    onReload={onReload}
                />
            ))}
        </div>
    )
}
