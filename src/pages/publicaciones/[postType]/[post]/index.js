import { Post } from "@/api";

export { default } from "./post";

export async function getServerSideProps(context) {
  console.log("SinglePost context: ", context);

  const {
    params: { postType, post },
  } = context;

  const postController = new Post();
  const postResponse = await postController.getBySlug(post);

  return {
    props: {
      post: postResponse,
    },
  };
}
