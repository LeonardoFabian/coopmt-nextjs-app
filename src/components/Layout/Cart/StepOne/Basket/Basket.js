import styles from "./Basket.module.scss";
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
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import numeral from "numeral";

export function Basket(props) {
  const { products } = props;
  console.log("Basket products: ", products);

  const { changeItemQuantity, deleteItem } = useCart();

  const options = Array.from({ length: 15 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h5 className={styles.heading}>Cesta</h5>
      <Table basic="very" className={styles.productList}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Producto</TableHeaderCell>
            <TableHeaderCell className={styles.price}>Precio</TableHeaderCell>
            <TableHeaderCell className={styles.quantity}>
              Cantidad
            </TableHeaderCell>
            <TableHeaderCell className={styles.total}>Total</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody className={styles.tableBody}>
          {map(products, (product) => (
            <TableRow key={product.id} className={styles.product}>
              <TableCell className={styles.productData}>
                <Shared.Image
                  src={product.attributes.image.data.attributes.url}
                />
                <div className={styles.info}>
                  <Link
                    href={`/productos/${product.attributes.supplier.data.attributes.slug}/${product.attributes.slug}`}
                  >
                    <span className={styles.title}>
                      {product.attributes.title}
                    </span>
                  </Link>
                  <span className={styles.supplier}>
                    <Link
                      href={`/productos/${product.attributes.supplier.data.attributes.slug}`}
                    >
                      {product.attributes.supplier.data.attributes.name}
                    </Link>
                  </span>
                  <div className={styles.actions}>
                    <span className={styles.remove}>
                      <Icon
                        name="trash"
                        link
                        onClick={() => deleteItem(product.id)}
                      />{" "}
                      Eliminar del carrito
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className={styles.productPrice}>
                {product.attributes.discount && (
                  <span className={styles.discount}>
                    {`-${product.attributes.discount}%`}
                  </span>
                )}
                <p className={styles.priceToBuy}>
                  {`RD$${numeral(
                    fn.calcDiscount(
                      product.attributes.price,
                      product.attributes.discount
                    )
                  ).format("0,0")}`}
                </p>
                {product.attributes.discount && (
                  <>
                    <p
                      className={styles.regularPriceText}
                    >{`Precio regular`}</p>
                    <p className={styles.regularPrice}>
                      {`RD$${numeral(product.attributes.price).format("0,0")}`}
                    </p>
                  </>
                )}
              </TableCell>
              <TableCell className={styles.productQuantity}>
                <div className={styles.quantity}>
                  <Dropdown
                    className="number"
                    options={options}
                    selection
                    value={product.quantity}
                    compact
                    onChange={(_, data) =>
                      changeItemQuantity(product.id, data.value)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className={styles.productTotal}>
                <p>Total aqui</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
