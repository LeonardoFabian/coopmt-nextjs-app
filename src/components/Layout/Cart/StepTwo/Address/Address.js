import styles from "./Address.module.scss";
import { Address as AddressCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
import { map } from "lodash";
import classNames from "classnames";

const addressController = new AddressCtrl();

export function Address(props) {
  const { addressSelected, setAddressSelected } = props;
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(null);
  console.log("Addresses: ", addresses);
  console.log("Address Selected: ", addressSelected);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressController.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.addresses}>
      <h5 className={styles.heading}>Dirección</h5>
      <div className={styles.content}>
        {map(addresses, (address) => (
          <div
            key={address.id}
            className={classNames(styles.address, {
              [styles.active]: address.id === addressSelected?.id,
            })}
            onClick={() => setAddressSelected(address)}
          >
            <p>
              {`${address.attributes.address}${
                address.attributes.address2
                  ? ", " + address.attributes.address2 + ", "
                  : ","
              } ${address.attributes.city.data.attributes.name}, ${
                address.attributes.state.data.attributes.name
              }`}
            </p>
            <p>
              {`${address.attributes.country.data.attributes.name} ${address.attributes.postalCode}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
