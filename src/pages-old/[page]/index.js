import { Page } from "@/api";
import Error from "next/error";
import { notFound } from "next/navigation";

export { default } from "./page";

export async function getServerSideProps(context) {
  console.log("Page context: ", context);
  const {
    params: { page },
  } = context;

  const pageController = new Page();
  const pageResponse = await pageController.getBySlug(page);
  const errorCode = pageResponse?.ok ? false : pageResponse?.status;

  // return 404 if page not found
  if (!pageResponse) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      errorCode: null,
      page: pageResponse || null,
    },
  };
}
