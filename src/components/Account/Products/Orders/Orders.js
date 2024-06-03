import styles from "./Orders.module.scss";
import { useState, useEffect } from "react";
import { Order as OrderCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { Shared } from "@/components/Shared";
import { Order } from "./Order";
import { map } from "lodash";

const orderController = new OrderCtrl();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderController.getAll(user.id);
        console.log("User Orders: ", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders)
    return (
      <Shared.NoResult text="Por el momento no tienes productos comprados." />
    );

  return (
    <div className={styles.orders}>
      {map(orders, (order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}
