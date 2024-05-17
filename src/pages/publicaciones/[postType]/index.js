import { PostType } from "@/api";
import { Post } from "@/api";

export { default } from "./postType";

export async function getServerSideProps(context) {
  console.log("Posts PostType context: ", context);

  const { query, params } = context;

  const { page = 1 } = query;
  const { postType } = params;

  const postTypeController = new PostType();
  const postTypeResponse = await postTypeController.getBySlug(postType);

  const postController = new Post();
  const postResponse = await postController.getByPostType(postType, page);

  return {
    props: {
      postType: postTypeResponse,
      posts: postResponse.data,
      pagination: postResponse.meta.pagination,
    },
  };
}
