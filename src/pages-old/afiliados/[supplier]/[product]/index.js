import { Product } from "@/api";

export { default } from "./product";

export async function getServerSideProps(context) {
  console.log("SingleProduct context: ", context);

  const {
    params: { product },
  } = context;

  const productController = new Product();
  const productResponse = await productController.getBySlug(product);

  return {
    props: {
      product: productResponse,
    },
  };
}
