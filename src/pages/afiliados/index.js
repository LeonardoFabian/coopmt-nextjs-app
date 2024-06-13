import { Supplier } from "@/api";

export { default } from "./afiliados";

export async function getServerSideProps(context) {
  console.log("Afiliados context: ", context);

  const { query } = context;

  const { page = 1 } = query;
  const supplierController = new Supplier();
  const supplierResponse = await supplierController.find();

  return {
    props: {
      suppliers: supplierResponse.data,
    },
  };
}
