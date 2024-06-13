import { RootLayout } from "@/layouts";
import { useEffect } from "react";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import { size, map } from "lodash";
import { Container } from "semantic-ui-react";
import Link from "next/link";

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
        <Shared.PageHeader title={`Resultados para "${searchText}"`} />
        <Container isContainer>
          <Shared.Separator height={54} />
          <h3>Páginas</h3>
          <Shared.Separator height={30} />
          {hasPages ? (
            <>
              <ul>
                {map(pages, (page) => (
                  <li key={page.id}>{page.attributes.title}</li>
                ))}
              </ul>
              <Shared.Separator height={54} />
              <Shared.Pagination
                currentPage={pagesPagination?.page}
                totalPages={pagesPagination?.pageCount}
              />
            </>
          ) : (
            <>
              <Shared.NoResult
                text={`No se encontraron páginas que coincidan con tu busqueda.`}
              />
            </>
          )}

          <Shared.Separator height={54} />
          <h3>Servicios</h3>
          <Shared.Separator height={30} />
          {hasServices ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(services, (service) => (
                  <Link
                    key={service.id}
                    href={`/servicios/${service.attributes.category.data.attributes.slug}/${service.attributes.slug}`}
                  >
                    <Custom.ServiceCard
                      title={service.attributes.title}
                      icon={service.attributes.icon}
                    />
                  </Link>
                ))}
              </Shared.Grid>
              <Shared.Separator height={54} />
              <Shared.Pagination
                currentPage={servicesPagination?.page}
                totalPages={servicesPagination?.pageCount}
              />
            </>
          ) : (
            <>
              <Shared.NoResult
                text={`No se encontraron servicios que coincidan con tu busqueda.`}
              />
            </>
          )}

          <Shared.Separator height={54} />
          <h3>Publicaciones</h3>
          <Shared.Separator height={30} />
          {hasPosts ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(posts, (post) => (
                  <Link
                    key={post.id}
                    href={`/publicaciones/${post.attributes.post_type.data.attributes.slug}/${post.attributes.slug}`}
                  >
                    <Custom.PostCard
                      post={post}
                      title={post?.attributes?.title}
                      image={post?.attributes?.featuredImage}
                    />
                  </Link>
                ))}
              </Shared.Grid>
              <Shared.Separator height={54} />
              <Shared.Pagination
                currentPage={postsPagination?.page}
                totalPages={postsPagination?.pageCount}
              />
            </>
          ) : (
            <>
              <Shared.NoResult
                text={`No se encontraron publicaciones que coincidan con tu busqueda.`}
              />
            </>
          )}

          <Shared.Separator height={54} />
          <h3>Productos</h3>
          <Shared.Separator height={30} />
          {hasProducts ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(products, (product) => (
                  <Link
                    key={product.id}
                    href={`/afiliados/${product.attributes.supplier.data.attributes.slug}/${product?.attributes?.slug}`}
                  >
                    <Custom.ProductCard
                      title={product?.attributes?.title}
                      image={product?.attributes?.image}
                      price={product?.attributes?.price}
                    />
                  </Link>
                ))}
              </Shared.Grid>
              <Shared.Separator height={54} />
              <Shared.Pagination
                currentPage={productsPagination?.page}
                totalPages={productsPagination?.pageCount}
              />
            </>
          ) : (
            <>
              <Shared.NoResult
                text={`No se encontraron productos que coincidan con tu busqueda.`}
              />
            </>
          )}
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
