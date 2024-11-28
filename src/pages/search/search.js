import { RootLayout } from "@/layouts";
import styles from "./search.module.scss";
import { useEffect } from "react";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import { size, map } from "lodash";
import { Container } from "semantic-ui-react";
import Link from "next/link";
import { Search } from "@/components/Search";

export default function SearchPage(props) {
  console.log("SearchPage props: ", props);

  const {
    searchText,
    services,
    posts,
    products,
    pages,
    servicesPagination,
    postsPagination,
    productsPagination,
    pagesPagination,
  } = props;

  // console.log("Search pages: ", pages);
  // console.log("Search services: ", services);
  console.log("Search posts: ", posts);

  const hasServices = size(services) > 0;
  const hasPosts = size(posts) > 0;
  const hasProducts = size(products) > 0;
  const hasPages = size(pages) > 0;

  useEffect(() => {
    const inputSearch = document.getElementById("search-input");
    inputSearch.focus();
  }, []);

  return (
    <>
      <Shared.Seo title={`Resultados para "${searchText}"`} />
      <RootLayout isOpenSearch={true}>
        <div className={styles.searchPage}>
          <header>
            <Shared.PageHeader title={`Resultados para "${searchText}"`} />
          </header>
          <Container isContainer>
            {hasPages && (
              <>
                <ul>
                  {map(pages?.data, (page) => {
                    console.log("page: ", page);
                    const title = page?.attributes?.title;
                    const description = page?.attributes?.description || "";
                    const link = `/pages/${page?.attributes?.slug}`;
                    const publishedAt = page?.attributes?.publishedAt;

                    return (
                      <li key={page.id}>
                        <Search.ResultItem
                          title={title}
                          link={link}
                          description={description}
                          date={publishedAt}
                          category="Páginas"
                        />
                      </li>
                    );
                  })}
                </ul>
                {/* <Shared.Pagination
                  currentPage={pagesPagination?.page}
                  totalPages={pagesPagination?.pageCount}
                /> */}
              </>
            )}

            {hasServices && (
              <>
                <ul>
                  {map(services?.data, (service) => {
                    console.log("service: ", service);

                    const title = service?.attributes?.title;
                    const description = service?.attributes?.description || "";
                    const link = `/services/${service?.attributes?.slug}`;
                    const publishedAt = service?.attributes?.createdAt;
                    const image = service?.attributes?.featuredImage?.data;

                    return (
                      <li key={service?.id}>
                        <Search.ResultItem
                          title={title}
                          link={link}
                          description={description}
                          date={publishedAt}
                          image={image}
                          category="Servicios"
                        />
                      </li>
                    );
                  })}
                </ul>

                {/* {servicesPagination && (
                  <Shared.Pagination
                    currentPage={servicesPagination?.page}
                    totalPages={servicesPagination?.pageCount}
                  />
                )} */}
              </>
            )}

            {hasPosts && (
              <>
                <ul>
                  {map(posts, (post) => {
                    {
                      /* console.log("post: ", post); */
                    }

                    const title = post?.attributes?.title;
                    const link = `/publicaciones/${post?.attributes?.post_type?.data?.attributes?.slug}/${post?.attributes?.slug}`;
                    const publishedAt = post?.attributes?.publishedAt;

                    return (
                      <li key={post.id}>
                        <Search.ResultItem
                          title={title}
                          link={link}
                          date={publishedAt}
                          category="Publicaciones"
                        />
                      </li>
                    );
                  })}
                </ul>

                {/* <Shared.Pagination
                  currentPage={postsPagination?.page}
                  totalPages={postsPagination?.pageCount}
                /> */}
              </>
            )}

            {hasProducts && (
              <>
                <ul>
                  {map(products, (product) => {
                    console.log("product: ", product);

                    const title = product?.attributes?.title;
                    const description = product?.attributes?.summary || "";
                    const link = `/afiliados/${product?.attributes?.supplier?.data?.attributes?.slug}/${product?.attributes?.slug}`;
                    const publishedAt = product?.attributes?.createdAt;
                    const image = product?.attributes?.image?.data;

                    return (
                      <li key={product?.id}>
                        <Search.ResultItem
                          title={title}
                          description={description}
                          link={link}
                          date={publishedAt}
                          image={image}
                          category="Productos"
                        />
                      </li>
                    );
                  })}
                </ul>

                {/* <Shared.Pagination
                  currentPage={productsPagination?.page}
                  totalPages={productsPagination?.pageCount}
                /> */}
              </>
            )}
          </Container>
        </div>
      </RootLayout>
    </>
  );
}
