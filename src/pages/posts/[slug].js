import { useRouter } from "next/router";
import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { Blocks } from "@/components/Blocks";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Post as PostCtrl } from "@/api";
import styles from "./posts.module.scss";
import { notFound } from "next/navigation";
import { Post as PostComponent } from "@/components/Post";

export default function Post({ post }) {
  const router = useRouter();
  console.log("Post props: ", post);

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  const title = post?.attributes?.title;
  const subtitle = post?.attributes?.subtitle;
  const description = post?.attributes?.description || "";
  const content = post?.attributes?.content;
  const blocks = post?.attributes?.blocks;
  const featuredImage = post?.attributes?.featuredImage?.data;
  const featuredImageSrc = featuredImage?.attributes?.url;
  const featuredImageAlt = featuredImage?.attributes?.alternativeText;
  const gallery = post?.attributes?.gallery?.data;

  return (
    <RootLayout>
      <Shared.Seo title={title} description={description} />
      <main className={styles.mainContent}>
        <Shared.Separator height={54} />
        <header className={styles.header}>
          <Container isContainer>
            <h1>{title}</h1>
          </Container>
        </header>
        {featuredImage && (
          <Container isContainer>
            <div className={styles.featuredImageContainer}>
              <Shared.Image
                src={featuredImageSrc}
                alt={featuredImageAlt}
                fluid
              />
            </div>
          </Container>
        )}
        {content && (
          <Container isContainer>
            <Blocks.RichText content={content} />
          </Container>
        )}
        <Container isContainer>
          {gallery && <PostComponent.Gallery images={gallery} />}
        </Container>
        {blocks && (
          <Container isContainer>
            <Blocks.RichText blocks={blocks} />
          </Container>
        )}
        <Shared.Separator height={54} />
      </main>
    </RootLayout>
  );
}

export async function getStaticPaths() {
  const postController = new PostCtrl();

  try {
    const posts = await postController.getAll();

    console.log("posts: ", posts);

    if (!posts?.data || posts?.data?.length === 0) {
      console.warn("No se encontraron posts");

      return {
        paths: [],
        fallback: true,
      };
    }

    const paths = posts?.data?.map((post) => ({
      params: {
        slug: post?.attributes?.slug,
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log("Error al obtener los posts: ", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  const postController = new PostCtrl();

  try {
    const postData = await postController.getBySlug(params.slug);
    console.log("postData: ", postData);

    if (!postData) {
      return { notFound: true };
      // throw new Error("Post not found");
    }

    return {
      props: {
        post: postData,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error getting post: ", error);
    return {
      notFound: true,
    };
  }
}
