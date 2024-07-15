import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { BlockRenderer } from "@/components/BlockRenderer";
import { forEach } from "lodash";

export default function SinglePage(props) {
  console.log("Page props: ", props);
  var _ = require("lodash");

  const { errorCode, page } = props;

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const title = page?.title;
  const description = page?.description;
  // const blocks = [{}];

  let innerBlocks = [{}];
  forEach(page?.blocks, (container, j) => {
    // page.blocks[j] = { ...container, __component: "layout.container" };
    forEach(container?.blocks, (block, i) => {
      block.button = { ...block.button, __component: "shared.button" };
      block.icon = { ...block.icon, __component: "components.icon" };
      block.image = { ...block.image, __component: "shared.image" };
      block.link = { ...block.link, __component: "components.link" };

      forEach(block.list?.item, (item, i) => {
        block.list.item[i] = { ...item, __component: "shared.paragraph" };
      });
      block.list = { ...block.list, __component: "shared.list" };

      forEach(block.paragraph, (item, i) => {
        block.paragraph[i] = { ...item, __component: "shared.paragraph" };
      });

      block.title = { ...block.title, __component: "shared.title" };

      innerBlocks[i] = {
        button: block.button,
        icon: block.icon,
        image: block.image,
        link: block.link,
        list: block.list,
        paragraph: block.paragraph,
        title: block.title,
      };

      console.log("Block: ", block);
      console.log("innerBlocks: ", innerBlocks);
    });

    console.log("page Blocks: ", page);
  });

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
        <BlockRenderer blocks={page?.blocks} />
        <Shared.Separator height={54} />
      </RootLayout>
    </>
  );
}
