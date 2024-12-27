import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import Link from "next/link";
import { Custom } from "@/components/Custom";
import { Post } from "@/api";
import { Shared } from "@/components/Shared";
import styles from "./noticias.module.scss";

export default function Noticias({ posts }) {
  console.log("NoticiasPage posts: ", posts);
  return (
    <RootLayout>
      <main className={styles.mainContent}>
        <Shared.Separator height={54} />
        <header className={styles.header}>
          <Container isContainer>
            <h1>Noticias</h1>
          </Container>
        </header>
        <Shared.Separator height={54} />

        {posts && posts?.data?.length > 0 ? (
          <Container isContainer>
            <Shared.Grid cols={3} gap="30px">
              {posts?.data?.map((post) => (
                <Custom.PostCard
                  key={`post-${post?.id}`}
                  post={post}
                  link={`/posts/${post?.attributes?.slug}`}
                />
              ))}
            </Shared.Grid>
          </Container>
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
        <Shared.Separator height={54} />
      </main>
    </RootLayout>
  );
}

export async function getStaticProps() {
  const postController = new Post();
  const limit = 100;

  try {
    const postsData = await postController.getAll(limit);
    console.log("posts: ", postsData);

    return {
      props: {
        posts: postsData || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
