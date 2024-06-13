import styles from "./SupplierCard.module.scss";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import { map, size } from "lodash";
import { Button, Icon } from "semantic-ui-react";

export function SupplierCard(props) {
  const {
    supplierId,
    name,
    slug,
    logo,
    featuredImage,
    information,
    socialNetworks,
  } = props;

  const image = featuredImage.data ? featuredImage : logo;
  const hasAddress = information?.location?.contactAddress;
  const address = information?.location?.contactAddress;

  const hasEmail = information?.location?.contactEmail;
  const email = information?.location?.contactEmail?.email;

  const hasPhones = size(information?.location?.contactPhones) > 0;
  const phones = information?.location?.contactPhones;

  const hasOpeningHours = size(information?.opening_hours) > 0;
  const openingHours = information?.opening_hours;

  return (
    <div className={styles.supplierCard}>
      <div className={styles.header}>
        <Shared.Image src={image.data.attributes.url} />
        <Link href={`/afiliados/${slug}`}>
          <h6>{name}</h6>
        </Link>
      </div>
      <div className={styles.info}>
        {hasAddress && (
          <div>
            <span>Dirección</span>

            <div>
              {/* <span>{address?.title}</span> */}
              <span>{address?.address}</span>
              <span>
                {address?.city}, {address?.state}
              </span>
              <span>{address?.postalCode}</span>
            </div>
          </div>
        )}
        {hasEmail && (
          <div>
            <span>Correo</span>
            <a href={`mailto:${email}`}>
              <span className={styles.email}>{email}</span>
            </a>
          </div>
        )}
        {hasPhones && (
          <div>
            <span>Télefono</span>
            {map(phones, (phone) => (
              <a href={`tel:${phone.number}`}>
                <span className={styles.phone}>{phone.number}</span>
              </a>
            ))}
          </div>
        )}
        {hasOpeningHours && (
          <div>
            <span>Horario</span>
            <div className={styles.hours}>
              {map(openingHours, (hour) => (
                <span key={hour.id} className={styles.hour}>
                  <span>{hour.day_interval}</span>
                  <span>
                    {hour?.opening_hour} - {hour?.closing_hour}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        {hasEmail && (
          <div>
            <Button as={Link} icon href={`mailto:${email}`}>
              <Icon name="envelope" />
            </Button>
            <span>Escribir</span>
          </div>
        )}
        {hasPhones && (
          <div>
            <Button as={Link} icon href={`tel:${phones[0].number}`}>
              <Icon name="phone" />
            </Button>
            <span>Llamar</span>
          </div>
        )}
        {hasAddress && (
          <div>
            <Button
              as={Link}
              icon
              href={`http://maps.google.com/?q=1200 ${address?.address}`}
            >
              <Icon name="map signs" />
            </Button>
            <span>Ver dirección</span>
          </div>
        )}
      </div>
      <div className={styles.moreInfo}>
        <span>Más información acerca de:</span>
        <ul>
          <li>
            <Link href={`/afiliados/${slug}`}>
              <span>Productos</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
