import { Category } from "@/api";
import { Service } from "@/api";

export { default } from "./category";

export async function getServerSideProps(context) {
  console.log("Services category context: ", context);

  const { query, params } = context;

  const { page = 1 } = query;
  const { category } = params;

  const categoryController = new Category();
  const categoryResponse = await categoryController.getBySlug(category);

  const serviceController = new Service();
  const serviceResponse = await serviceController.getByCategory(category, page);

  return {
    props: {
      category: categoryResponse,
      services: serviceResponse.data,
      pagination: serviceResponse.meta.pagination,
    },
  };
}
