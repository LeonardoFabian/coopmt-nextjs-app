import { Supplier } from "@/api";
import { Product } from "@/api";

export { default } from "./supplier";

export async function getServerSideProps(context) {
  console.log("Products supplier context: ", context);

  const { query, params } = context;

  const { page = 1 } = query;
  const { supplier } = params;

  const supplierController = new Supplier();
  const supplierResponse = await supplierController.getBySlug(supplier);

  const productController = new Product();
  const productResponse = await productController.getBySupplier(supplier, page);

  return {
    props: {
      supplier: supplierResponse,
      products: productResponse.data,
      pagination: productResponse.meta.pagination,
    },
  };
}
