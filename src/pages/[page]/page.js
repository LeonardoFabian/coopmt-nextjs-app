import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { BlockRenderer } from "@/components/BlockRenderer";

export default function SinglePage(props) {
  console.log("Page props: ", props);

  const { page } = props;

  const title = page?.attributes?.title;
  const description = page?.attributes?.description;

  return (
    <>
      <Shared.Seo title={`COOPMT - ${title}`} description={description} />
      <RootLayout>
        <Container isContainer>
          <Shared.Separator height={54} />
          <h2>{title}</h2>
          <Shared.Separator height={16} />
          <p>{description}</p>
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
