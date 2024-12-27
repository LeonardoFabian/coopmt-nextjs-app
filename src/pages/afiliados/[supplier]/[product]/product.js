import { RootLayout } from "@/layouts";
import { Product } from "@/components/Product";
import { Shared } from "@/components/Shared";
// import { Product } from "@/components/Product";
import { Container, Button, Icon } from "semantic-ui-react";
import styles from "./product.module.scss";
import Link from "next/link";
import numeral from "numeral";
import { fn } from "@/utils";
import { map, size } from "lodash";
import { useEffect } from "react";

export default function SingleProduct(props) {
  console.log("SingleProduct props: ", props);

  const { product } = props;
  const TEST_SLIDE_COUNT = 10;

  const title = product?.attributes?.title;
  const productId = product?.id;
  const summary = product?.attributes?.summary;
  const imageSrc = product?.attributes?.image?.data?.attributes?.url;
  const slides = product?.attributes?.gallery?.data;
  const hasGallery = size(product?.attributes?.gallery?.data) > 0;
  // const slides =
  // product?.attributes?.gallery?.data ||
  // Array.from(Array(TEST_SLIDE_COUNT).keys());
  const video = product?.attributes?.video;
  const options = {};
  const price = product?.attributes?.price;
  const priceToPay = fn.calcDiscount(
    product?.attributes?.price,
    product?.attributes?.discount
  );
  const hasDiscount = Boolean(product?.attributes?.discount);
  const discount = product?.attributes?.discount;
  const supplierData = product?.attributes?.supplier?.data;

  // Google Analytics event
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "producto_visto", {
        app_name: "Sitio Web",
        screen_name: "Detalles del producto",
        product_id: productId,
        product_name: title,
        product_price: priceToPay,
        product_supplier: supplierData?.attributes?.name,
      });
    } else {
      console.log("Google Analytics no está disponible");
    }
  }, [title, productId]);

  /**
   * Send a Google Analytics event when the user adds a product to the cart
   *
   * @function handleAddToCart
   * @param {Object} event - The event data
   */
  const handleAddToCart = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "añadir_al_carrito", {
        app_name: "Sitio Web",
        screen_name: "Detalles del producto",
        product_id: productId,
        product_name: title,
        product_price: priceToPay,
      });
    }
  };

  /**
   * Send a Google Analytics event when the user adds a product to the wishlist
   *
   * @function handleAddToWishlist
   */
  const handleAddToWishlist = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "añadir_a_lista_de_deseos", {
        app_name: "Sitio Web",
        screen_name: "Detalles del producto",
        product_id: productId,
        product_name: title,
        product_price: priceToPay,
      });
    }
  };

  return (
    <>
      <Shared.Seo title={title} />
      <RootLayout>
        {/* <Product.ProductCover
        heading={title}
        description={summary}
        imageSrc={imageSrc}
        link="#"
        linkText="Cotizar"
      /> */}
        <Container isContainer>
          <Shared.Separator height={54} />
          <div className={styles.productOverview}>
            <div className={styles.productPreview}>
              {hasGallery ? (
                <Product.ProductGallery
                  slides={slides}
                  video={video}
                  options={options}
                />
              ) : (
                <Shared.Image src={imageSrc} />
              )}
            </div>
            <div className={styles.productData}>
              <h3>{title}</h3>
              <Link
                href={`/afiliados/${supplierData?.attributes?.slug}`}
                className={styles.supplierData}
                target="_self"
              >
                Suplidor: {supplierData?.attributes?.name}
              </Link>
              <Shared.Separator height={16} />
              <div className={styles.corePriceDisplay}>
                <div className={styles.corePrice}>
                  {hasDiscount && (
                    <span
                      className={styles.savingsPercentage}
                    >{`-${discount}%`}</span>
                  )}
                  <span className={styles.priceToPay}>
                    RD${numeral(priceToPay).format("0,0")}
                  </span>
                </div>
                {hasDiscount && (
                  <div className={styles.regularPriceDisplay}>
                    Precio regular: RD$
                    <span className={styles.regularPrice}>
                      {numeral(price).format("0,0")}
                    </span>
                  </div>
                )}
              </div>
              <Shared.Separator height={16} />
              <p>{summary}</p>
              <Shared.Separator height={16} />
              <div className={styles.actions}>
                <Shared.AddToCart
                  productId={product?.id}
                  onClick={handleAddToCart}
                />
                <Button secondary className={styles.quote}>
                  <Icon name="calculator" /> Cotizar
                </Button>
                <Shared.AddToWishlist
                  productId={product?.id}
                  className={styles.wishlist}
                  onClick={handleAddToWishlist}
                />
              </div>
            </div>
          </div>
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
