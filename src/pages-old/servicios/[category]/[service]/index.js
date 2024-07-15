import { Service } from "@/api";

export { default } from "./service";

export async function getServerSideProps(context) {
  console.log("SingleService context: ", context);

  const { params } = context;
  const { category, service } = params;

  const serviceController = new Service();
  const serviceResponse = await serviceController.getBySlug(service);

  return {
    props: {
      service: serviceResponse,
    },
  };
}
