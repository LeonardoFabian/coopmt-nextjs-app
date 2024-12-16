import styles from "./Wishlist.module.scss";
import { useState, useEffect } from "react";
import { Wishlist as WishlistCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { map, size } from "lodash";
import { Shared } from "@/components/Shared";
import { ProductsGrid } from "./ProductsGrid";

const wishlistController = new WishlistCtrl();

export function Wishlist() {
  const { user } = useAuth();
  const router = useRouter();
  const [productsWishlisted, setProductsWishlisted] = useState(null);

  //   if (!user) {
  //     router.push("/");
  //     return null;
  //   }

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistController.getAll(user.id);
        // console.log("wishlistController response: ", response);
        setProductsWishlisted(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [productsWishlisted]);

  return size(productsWishlisted) === 0 ? (
    <Shared.NoResult text="No tienes productos añadidos a tu lista de deseos" />
  ) : (
    <ProductsGrid products={productsWishlisted} />
  );
}
