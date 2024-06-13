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
import { map, size } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import numeral from "numeral";

export function Basket(props) {
  const { products } = props;
  console.log("Basket products: ", products);

  const { changeItemQuantity, deleteItem } = useCart();

  const options = Array.from({ length: 25 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  if (size(products) === 0)
    return <Shared.NoResult text="No tienes productos añadidos al carrito." />;

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
                    href={`/afiliados/${product.attributes.supplier.data.attributes.slug}/${product.attributes.slug}`}
                  >
                    <span className={styles.title}>
                      {product.attributes.title}
                    </span>
                  </Link>
                  <span className={styles.supplier}>
                    <Link
                      href={`/afiliados/${product.attributes.supplier.data.attributes.slug}`}
                    >
                      {product.attributes.supplier.data.attributes.name}
                    </Link>
                  </span>
                  <div className={styles.actions}>
                    <span
                      className={styles.remove}
                      onClick={() => deleteItem(product.id)}
                    >
                      <Icon name="trash" link /> Eliminar del carrito
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
                    fn
                      .calcDiscount(
                        product.attributes.price,
                        product.attributes.discount
                      )
                      .toFixed(2)
                  ).format("0,0.00")}`}
                </p>
                {product.attributes.discount && (
                  <>
                    <p
                      className={styles.regularPriceText}
                    >{`Precio regular`}</p>
                    <p className={styles.regularPrice}>
                      {`RD$${numeral(
                        product.attributes.price.toFixed(2)
                      ).format("0,0.00")}`}
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
                <p className={styles.totalByQuantity}>
                  RD$
                  {numeral(
                    fn
                      .calcTotalByQuantity(
                        fn.calcDiscount(
                          product.attributes.price,
                          product.attributes.discount
                        ),
                        product.quantity
                      )
                      .toFixed(2)
                  ).format("0,0.00")}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
