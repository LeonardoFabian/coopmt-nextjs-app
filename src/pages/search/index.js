export { default } from "./search";
import { Service, Post, Product, Page } from "@/api";

export async function getServerSideProps(context) {
  console.log("SearchPage context: ", context);

  const {
    query: {
      s,
      servicesPage = 1,
      postsPage = 1,
      productsPage = 1,
      pagesPage = 1,
    },
  } = context;

  const serviceController = new Service();
  const postController = new Post();
  const productController = new Product();
  const pageController = new Page();

  const serviceResponse = await serviceController.search(s, servicesPage);
  const postResponse = await postController.search(s, postsPage);
  const productResponse = await productController.search(s, productsPage);
  const pageResponse = await pageController.search(s, pagesPage);

  // console.log("serviceResponse: ", serviceResponse);
  // console.log("postResponse: ", postResponse);
  // console.log("productResponse: ", productResponse);
  // console.log("pageResponse: ", pageResponse);

  return {
    props: {
      searchText: s,
      services: serviceResponse,
      posts: postResponse?.data,
      products: productResponse?.data,
      pages: pageResponse,
      servicesPagination: serviceResponse?.meta?.pagination,
      postsPagination: postResponse?.meta?.pagination,
      productsPagination: productResponse?.meta?.pagination,
      pagesPagination: pageResponse?.meta?.pagination,
    },
  };
}
