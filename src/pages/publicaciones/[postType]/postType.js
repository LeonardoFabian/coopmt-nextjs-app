import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { size, map } from "lodash";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import Link from "next/link";

export default function PostTypePage(props) {
  console.log("PostTypePage props: ", props);

  const { postType, posts, pagination } = props;
  const hasPosts = size(posts) > 0;

  return (
    <RootLayout>
      <Shared.PageHeader title={postType?.attributes?.name} />
      <Container isContainer>
        <Shared.Separator height={54} />
        {hasPosts ? (
          <>
            <Shared.Grid cols={3} gap="30px">
              {map(posts, (post) => (
                <Link
                  key={post?.id}
                  href={`/publicaciones/${postType?.attributes?.slug}/${post?.attributes?.slug}`}
                >
                  <Custom.PostCard post={post} />
                </Link>
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
      </Container>
    </RootLayout>
  );
}
