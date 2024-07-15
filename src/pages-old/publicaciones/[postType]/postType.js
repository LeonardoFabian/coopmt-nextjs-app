import styles from "./postType.module.scss";
import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { size, map, forEach, groupBy } from "lodash";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PostTypePage(props) {
  console.log("PostTypePage props: ", props);

  const { postType, posts, pagination } = props;
  const hasPosts = size(posts) > 0;
  const [postsByTaxonomy, setPostsByTaxonomy] = useState({});

  useEffect(() => {
    const groupedPosts = groupBy(
      posts,
      (post) => post.attributes.taxonomy.data.attributes.name
    );
    setPostsByTaxonomy(groupedPosts);
  }, [posts]);

  console.log("PostsByTaxonomy: ", postsByTaxonomy);

  return (
    <>
      <Shared.Seo title={`COOPMT - ${postType?.attributes?.name}`} />
      <RootLayout>
        <Shared.PageHeader title={postType?.attributes?.name} />
        <Container isContainer className={styles.content}>
          <Shared.Separator height={54} />
          {hasPosts ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(posts, (post) => (
                  <>
                    <Link
                      key={post?.id}
                      href={`/publicaciones/${postType?.attributes?.slug}/${post?.attributes?.slug}`}
                    >
                      <Custom.PostCard post={post} />
                    </Link>
                  </>
                ))}
              </Shared.Grid>
              <Shared.Separator height={54} />

              <Shared.Pagination
                currentPage={pagination?.page}
                totalPages={pagination?.pageCount}
              />
            </>
          ) : (
            <Shared.NoResult
              text={`Por el momento no se han publicado ${postType?.attributes?.name}.`}
            />
          )}
          <Shared.Separator height={54} />
          {hasPosts ? (
            <>
              {map(postsByTaxonomy, (posts, taxonomyName) => (
                <div key={taxonomyName} className={styles.taxonomyWrapper}>
                  {/* <Shared.Separator height={54} /> */}
                  <h5 className={styles.heading}>
                    {`Últimas publicaciones en `}
                    <span className={styles.taxonomyName}>{taxonomyName}</span>
                  </h5>
                  {/* <Shared.Separator height={30} /> */}
                  <Shared.Grid cols={3} gap="30px">
                    {map(posts, (post) => (
                      <Custom.PostCard post={post} />
                    ))}
                  </Shared.Grid>
                </div>
              ))}
              <Shared.Separator height={54} />
            </>
          ) : null}
        </Container>
      </RootLayout>
    </>
  );
}
