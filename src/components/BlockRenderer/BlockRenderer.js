import { Home } from "../Home";
import { Block } from "../Block";
import { Shared } from "../Shared";

export function BlockRenderer({ blocks }) {
  return (blocks || []).map((block) => {
    switch (block?.__component) {
      case "layout.hero-section":
        return <Home.HeroSection key={block?.id} block={block} />;
        break;
      case "layout.features-section":
        return <Home.FeaturesSection key={block?.id} data={block} />;
        break;
      case "layout.services-section":
        return <Home.FeaturedServices key={block?.id} data={block} />;
        break;
      case "layout.blog-section":
        return (
          <Home.LatestPosts
            key={block?.id}
            heading={block?.heading}
            subheading={block?.subheading}
            link={block?.link}
          />
        );
        break;
      case "layout.logo-clouds":
        return <Home.LogoClouds key={block?.id} block={block} />;
        break;
      case "components.link":
        return <Block.Link key={block?.id} block={block} />;
        break;
      case "layout.dropdown-menu":
        return <Block.DropdownMenu key={block?.id} block={block} />;
        break;
      case "components.page-link":
        return <Block.PageLink key={block?.id} block={block} />;
        break;
      case "components.banner":
        return (
          <Shared.Banner
            key={block?.id}
            image={block?.image}
            title={block?.title}
            link={block?.url || "#"}
            target={block.target || "_self"}
          />
        );
        break;
      default:
        return null;
        break;
    }
  });
}
