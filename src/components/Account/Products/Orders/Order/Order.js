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

export function Order(props) {
  const { order } = props;
  const createdAt = new Date(order.attributes.createdAt).toISOString();
  const products = order.attributes.products;

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
                {order.attributes.shippingAddress.attributes.address}
                {order.attributes.shippingAddress.attributes.address2
                  ? ` ${order.attributes.shippingAddress.attributes.address2}`
                  : ""}
              </span>
              <span>
                {`${order.attributes.shippingAddress.attributes.city.data.attributes.name}, ${order.attributes.shippingAddress.attributes.state.data.attributes.name}, ${order.attributes.shippingAddress.attributes.country.data.attributes.name}, ${order.attributes.shippingAddress.attributes.postalCode}`}
              </span>
            </div>
            <div>
              <span>Pedido Nº</span>
              <span>{order.id}</span>
              {/* <span>{order.attributes.stripePaymentId}</span> */}
            </div>
          </Shared.Grid>
        </div>
        <div className={styles.body}>
          {map(products, (product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
