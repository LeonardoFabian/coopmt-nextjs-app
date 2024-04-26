import { Home } from "../Home";
import { Block } from "../Block";

export function BlockRenderer({ blocks }) {
  return (blocks || []).map((block) => {
    switch (block?.__component) {
      case "layout.hero-section":
        return <Home.HeroSection key={block?.id} data={block} />;
        break;
      case "layout.features-section":
        return <Home.FeaturesSection key={block?.id} data={block} />;
        break;
      case "layout.services-section":
        return <Home.FeaturedServices key={block?.id} data={block} />;
        break;
      case "layout.blog-section":
        return <Home.LatestPosts key={block?.id} data={block} />;
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
      default:
        return null;
        break;
    }
  });
}
