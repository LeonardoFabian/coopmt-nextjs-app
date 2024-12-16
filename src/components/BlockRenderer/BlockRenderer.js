import { Home } from "../Home";
import { Block } from "../Block";
import { Blocks } from "../Blocks";
import { Shared } from "../Shared";
import { Page } from "../Page";
import { Fees, Requirements, Container, Group, ProductList } from "../Layout";
import { Supplier } from "../Supplier";

export function BlockRenderer({ blocks }) {
  return (blocks || []).map((block) => {
    console.log("BlockRenderer: ", block);

    switch (block?.__component) {
      case "page.board-section":
        console.log("Board section: ", block);
        return (
          <Page.BoardSection
            key={`c-board-section-${block?.id}`}
            title={block?.title}
            groups={block?.board_groups}
          />
        );
        break;
      case "blocks.cta":
        return (
          <Blocks.Cta
            key={`cta-${block?.id}`}
            buttons={block?.buttons}
            text={block?.text}
            title={block?.title}
            theme={block?.theme}
          />
        );
        break;
      case "supplier.hero":
        return (
          <Supplier.Hero key={`hero-${block?.id}`} banner={block?.banner} />
        );
        break;
      case "layout.product-list":
        return (
          <ProductList
            key={`product-list-${block?.id}`}
            heading={block?.heading}
            subheading={block?.subheading}
            limit={block?.limit}
            columns={block?.columns}
            link={block?.link}
          />
        );
        break;
      case "layout.container":
        return (
          <Container
            key={`container-${block?.id}`}
            display={block?.display}
            theme={block?.theme}
            alignItems={block?.alignItems}
            flexDirection={block?.flexDirection}
            justifyContent={block?.justifyContent}
            gap={block?.gap}
            isContainer={block?.isContainer}
            blocks={block.blocks}
          >
            {block?.blocks?.map((innerBlocks) => {
              return (
                <Group
                  key={`group-${innerBlocks?.id}`}
                  display={innerBlocks?.display}
                  theme={innerBlocks?.theme}
                  alignItems={innerBlocks?.alignItems}
                  flexDirection={innerBlocks?.flexDirection}
                  justifyContent={innerBlocks?.justifyContent}
                  gap={innerBlocks?.gap}
                  isContainer={innerBlocks?.isContainer}
                  blocks={innerBlocks}
                />
              );
            })}
          </Container>
        );
        break;
      case "blocks.faqs":
        return (
          <Blocks.Faqs
            key={`faqs-${block?.id}`}
            title={block.title}
            faqs={block.faqs}
            theme={block.theme}
          />
        );
        break;
      case "layout.requirements":
        return (
          <Requirements
            key={`requirements-${block?.id}`}
            heading={block.heading}
            requirements={block.requirements}
          />
        );
        break;
      case "layout.fees":
        return <Fees heading={block.heading} fees={block.fees} />;
        break;
      case "layout.hero-section":
        return (
          <Home.HeroSection key={`hero-section-${block?.id}`} block={block} />
        );
        break;
      case "layout.features-section":
        return (
          <Home.FeaturesSection
            key={`features-section-${block?.id}`}
            data={block}
          />
        );
        break;
      case "layout.services-section":
        return (
          <Home.FeaturedServices
            key={`featured-service-${block?.id}`}
            data={block}
          />
        );
        break;
      case "layout.blog-section":
        return (
          <Home.LatestPosts
            key={`latest-posts-${block?.id}`}
            heading={block?.heading}
            subheading={block?.subheading}
            link={block?.link}
          />
        );
        break;
      case "layout.logo-clouds":
        return (
          <Home.LogoClouds
            key={`logo-clouds-${block?.id}`}
            suppliers={block?.suppliers?.data}
            heading={block?.heading}
            subheading={block?.subheading}
          />
        );
        break;
      case "components.link":
        return <Block.Link key={`link-${block?.id}`} block={block} />;
        break;
      case "layout.dropdown-menu":
        return (
          <Block.DropdownMenu
            key={`dropdown-menu-${block?.id}`}
            block={block}
          />
        );
        break;
      case "components.page-link":
        return <Block.PageLink key={`page-link-${block?.id}`} block={block} />;
        break;
      case "shared.postype-link":
        return (
          <Block.PosttypeLink
            key={`postype-link-${block?.id}`}
            label={block?.label}
            post_type={block?.post_type}
          />
        );
        break;
      case "shared.service-link":
        return (
          <Block.ServiceLink
            key={`service-link-${block?.id}`}
            label={block?.label}
            description={block?.description}
            service={block?.service}
            icon={block?.icon}
          />
        );
        break;
      case "components.banner":
        return (
          <Shared.Banner
            key={`banner-${block?.id}`}
            title={block?.title}
            text={block?.text}
            url={block?.url || "#"}
            target={block?.target || "_self"}
            ad={block?.ad}
            display={block?.display}
          />
        );
        break;
      default:
        return null;
        break;
    }
  });
}
