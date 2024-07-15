import styles from "./cart.module.scss";
import { useState, useEffect } from "react";
import { CartLayout } from "@/layouts";
import { Shared } from "@/components/Shared";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useCart } from "@/hooks";
import { Product } from "@/api";
import { Cart } from "@/components/Layout";
import { useAuth } from "@/hooks";

const productController = new Product();

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const {
    query: { step = 1 },
  } = useRouter();

  const currentStep = Number(step);
  const [products, setProducts] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          // console.log("Cart item: ", item);
          const response = await productController.getById(item.id);
          // console.log("Cart item by ID: ", response);
          data.push({ ...response.data, quantity: item.quantity });
        }
        // console.log("products on cart data: ", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <Shared.Seo title={`COOPMT - Carrito de compra`} />
      <CartLayout>
        <Container isContainer>
          <Shared.Separator height={30} />
          {currentStep === 1 && <Cart.StepOne products={products} />}
          {currentStep === 2 && <Cart.StepTwo products={products} />}
          {currentStep === 3 && <Cart.StepThree />}
          <Shared.Separator height={30} />
        </Container>
      </CartLayout>
    </>
  );
}
