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
  // console.log("Page props: ", props);
  // var _ = require("lodash");

  // const { errorCode, page } = props;

  // if (errorCode) {
  //   return <Error statusCode={errorCode} />;
  // }

  const title = page?.attributes?.title;
  const description = page?.attributes?.description;
  const content = page?.attributes?.content;
  const blocks = page?.attributes?.blocks;
  // const blocks = [{}];

  // let innerBlocks = [{}];
  // forEach(page?.blocks, (container, j) => {
  //   // page.blocks[j] = { ...container, __component: "layout.container" };
  //   forEach(container?.blocks, (block, i) => {
  //     block.button = { ...block.button, __component: "shared.button" };
  //     block.icon = { ...block.icon, __component: "components.icon" };
  //     block.image = { ...block.image, __component: "shared.image" };
  //     block.link = { ...block.link, __component: "components.link" };

  //     forEach(block.list?.item, (item, i) => {
  //       block.list.item[i] = { ...item, __component: "shared.paragraph" };
  //     });
  //     block.list = { ...block.list, __component: "shared.list" };

  //     forEach(block.paragraph, (item, i) => {
  //       block.paragraph[i] = { ...item, __component: "shared.paragraph" };
  //     });

  //     block.title = { ...block.title, __component: "shared.title" };

  //     innerBlocks[i] = {
  //       button: block.button,
  //       icon: block.icon,
  //       image: block.image,
  //       link: block.link,
  //       list: block.list,
  //       paragraph: block.paragraph,
  //       title: block.title,
  //     };

  //     console.log("Block: ", block);
  //     console.log("innerBlocks: ", innerBlocks);
  //   });

  //   // console.log("page Blocks: ", page);
  // });

  return (
    <>
      <Shared.Seo title={`COOPMT - ${title}`} description={description} />
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

// export async function getServerSideProps(context) {
//   // console.log("Page context: ", context);
//   // const {
//   //   params: { page },
//   // } = context;

//   const { page } = context.params;

//   const pageController = new Page();

//   try {
//     const pageResponse = await pageController.getBySlug(page);
//     const errorCode = pageResponse?.ok ? false : pageResponse?.status;

//     console.log("pageResponse: ", pageResponse);
//     console.log("errorCode: ", errorCode);

//     // return 404 if page not found
//     if (!pageResponse || pageResponse.length === 0) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: {
//         errorCode: null,
//         page: pageResponse,
//       },
//     };
//   } catch (error) {
//     console.log("Error al obtener la página: ", error);
//     return {
//       props: {
//         errorCode: 500,
//         page: null,
//       },
//     };
//   }
// }

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
