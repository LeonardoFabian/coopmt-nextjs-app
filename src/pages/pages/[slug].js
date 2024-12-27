import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { Blocks } from "@/components/Blocks";
import { BlockRenderer } from "@/components/BlockRenderer";
import { forEach } from "lodash";
import { Page as PageCtrl } from "@/api";
import Error from "next/error";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import styles from "./pages.module.scss";

export default function Page({ page }) {
  const router = useRouter();
  // const { page } = props;
  console.log("PAGE: ", page);

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  const title = page?.attributes?.title;
  const description = page?.attributes?.description;
  const content = page?.attributes?.content;
  const blocks = page?.attributes?.blocks;
  console.log("blocks: ", blocks);
  // const blocks = [{}];

  return (
    <>
      <Shared.Seo title={`${title}`} description={description} />
      <RootLayout>
        <main className={styles.mainContent}>
          <Shared.Separator height={54} />
          <header className={styles.header}>
            <Container isContainer>
              <h1>{title}</h1>
              <Shared.Separator height={54} />
            </Container>
          </header>
          {content && (
            <Container isContainer>
              <Blocks.RichText content={content} />
            </Container>
          )}
          {blocks && (
            <Container isContainer>
              <BlockRenderer blocks={blocks} />
            </Container>
          )}
          <Shared.Separator height={54} />
        </main>
      </RootLayout>
    </>
  );
}

export async function getStaticPaths() {
  const pageController = new PageCtrl();

  try {
    const pages = await pageController.getAll();

    if (!pages?.data || pages.data.length === 0) {
      // return { notFound: true };
      console.warn("Pages not found");
      // throw new Error("Pages not found");
      return {
        paths: [],
        fallback: true, // Cambia a `false` si no deseas manejar rutas faltantes
      };
    }

    const paths = pages?.data?.map((page) => ({
      params: {
        slug: page?.attributes?.slug,
      },
    }));

    return {
      paths,
      fallback: true, // permite generar páginas dinámicas si no estan pre-renderizadas
    };
  } catch (error) {
    console.log("Error al obtener las páginas: ", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  const pageController = new PageCtrl();

  try {
    const pageData = await pageController.getBySlug(params.slug);
    console.log("pageData: ", pageData);

    if (!pageData?.data || pageData.data.length === 0) {
      return { notFound: true };
      // throw new Error("Page not found");
    }

    return {
      props: {
        page: pageData.data[0],
      },
      revalidate: 10, // revalida la página cada 10 segundos
    };
  } catch (error) {
    console.error("Error getting page: ", error);
    return {
      notFound: true,
    };
  }
}
