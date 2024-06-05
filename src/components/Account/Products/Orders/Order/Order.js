import styles from "./Order.module.scss";
import {
  Icon,
  Dropdown,
  Table,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
} from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import numeral from "numeral";
import { DateTime } from "luxon";
import { Product } from "./Product";
import { map } from "lodash";
import Link from "next/link";
import { useState } from "react";
import { fn } from "@/utils";

export function Order(props) {
  const { order } = props;
  console.log("ORDER: ", order);
  const [showModal, setShowModal] = useState(false);
  const createdAt = new Date(order.attributes.createdAt).toISOString();
  const products = order.attributes.products;
  const address = order.attributes.shippingAddress;
  const shipping = 0.0;

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <div className={styles.order}>
        <div className={styles.header}>
          <Shared.Grid
            cols={4}
            gap="16px"
            className={styles.orderHeaderWrapper}
          >
            <div>
              <span>Pedido realizado</span>
              <span>
                {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
                  "dd/MM/yyyy"
                )}
              </span>
            </div>
            <div>
              <span>Total</span>
              <span>{`RD$${numeral(
                order.attributes.totalPayment.toFixed(2)
              ).format("0,0.00")}`}</span>
            </div>
            <div>
              <span>Enviado a</span>
              <span>
                {address.attributes.address}
                {address.attributes.address2
                  ? ` ${address.attributes.address2}`
                  : ""}
              </span>
              <span>
                {`${address.attributes.city.data.attributes.name}, ${address.attributes.state.data.attributes.name}, ${address.attributes.country.data.attributes.name}, ${address.attributes.postalCode}`}
              </span>
            </div>
            <div className={styles.details}>
              <span>
                Pedido Nº <span>{order.id}</span>
              </span>

              <Link href="#" className={styles.link} onClick={handleShowModal}>
                Ver detalles del pedido
              </Link>
            </div>
          </Shared.Grid>
        </div>
        <div className={styles.body}>
          {map(products, (product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={handleShowModal}
        title="Detalles del pedido"
        width={75}
      >
        <div className={styles.orderDetails}>
          <div className={styles.ordertDetailsHeader}>
            <div className={styles.orderHeaderInfo}>
              <span>
                {`Pedido el ${DateTime.fromISO(createdAt, {
                  locale: "es",
                }).toFormat("dd/MM/yyyy")}`}
              </span>
              <span>|</span>
              <span>
                Pedido Nº <span>{order.id}</span>
              </span>
            </div>
            <div className={styles.orderHeaderActions}>
              <a href="#">Imprimir</a>
            </div>
          </div>

          <div className={styles.orderInfo}>
            <div className={styles.left}>
              <div>
                <span>Dirección de envío</span>
                <span>{address.attributes.address}</span>
                {address.attributes.address2 && (
                  <span>{address.attributes.address2}</span>
                )}
                <span>{address.attributes.city.data.attributes.name}</span>
                <span>{address.attributes.state.data.attributes.name}</span>
                <span>{address.attributes.country.data.attributes.name}</span>
                {address.attributes.postalCode && (
                  <span>{address.attributes.postalCode}</span>
                )}
              </div>
              <div>
                <span>Método de pago</span>
              </div>
            </div>
            <div className={styles.right}>
              <div>
                <span>Resumen del pedido</span>
                <div className={styles.summary}>
                  <div>
                    <span>Productos</span>
                    <span>{`RD$${numeral(
                      order.attributes.totalPayment.toFixed(2)
                    ).format("0,0.00")}`}</span>
                  </div>
                  <div>
                    <span>Envío</span>
                    <span>{`RD$${numeral(shipping.toFixed(2)).format(
                      "0,0.00"
                    )}`}</span>
                  </div>
                  <div>
                    <span>Total</span>
                    <span>{`RD$${numeral(
                      order.attributes.totalPayment.toFixed(2)
                    ).format("0,0.00")}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.products}>
            {map(products, (product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Shared.AppModal>
    </>
  );
}
