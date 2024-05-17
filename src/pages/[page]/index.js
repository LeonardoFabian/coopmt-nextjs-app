import { Page } from "@/api";

export { default } from "./page";

export async function getServerSideProps(context) {
  console.log("Page context: ", context);
  const {
    params: { page },
  } = context;

  const pageController = new Page();
  const pageResponse = await pageController.getBySlug(page);

  return {
    props: {
      page: pageResponse,
    },
  };
}
