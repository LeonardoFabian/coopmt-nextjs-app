import styles from "./wishlist.module.scss";
import { MeLayout } from "@/layouts";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import { fn } from "@/utils";
import { useState, useEffect } from "react";
import { Wishlist } from "@/api";
import { Shared } from "@/components/Shared";
import numeral from "numeral";

export default function MeWishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const wishlistController = new Wishlist();

  if (!user) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistController.getAll(user.id);
        console.log("User wishlist: ", response);
        setWishlist(response);
      } catch (error) {
        console.error("Error al obtener tu lista de deseos: ", error);
      }
    })();
  }, []);

  return (
    <MeLayout title="Lista de deseos">
      <div className={styles.wishlist}>
        <p>
          Estos son los productos que has guardado en tu lista de deseos. ¡No
          pierdas la oportunidad de hacerlos tuyos!
        </p>
        <ul className={styles.wishlistItems}>
          {wishlist.length > 0 &&
            wishlist.map((item) => {
              const product = item.attributes.product.data;
              const productTitle = product.attributes.title;
              const image = product.attributes.image.data.attributes;
              const imageUrl = image.url;
              const imageAlt = image.alternativeText;
              const price = product.attributes.price;
              const discount = product.attributes.discount;
              const hasDiscount = discount > 0;

              const priceToPay = fn.calcDiscount(price, discount);

              return (
                <li key={item.id} className={styles.wishlistItem}>
                  <Shared.Image src={imageUrl} />
                  <span>{productTitle}</span>
                  <div className={styles.price}>
                    <p>Desde</p>
                    <p className={styles.corePrice}>
                      <span className={styles.priceToPay}>
                        {`RD$${numeral(priceToPay).format("0,0")} `}
                      </span>
                      {hasDiscount && (
                        <>
                          <span className={styles.regularPrice}>
                            {`RD$${numeral(price).format("0,0")}`}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </MeLayout>
  );
}
