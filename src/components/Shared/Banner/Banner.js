import styles from "./Banner.module.scss";
import { Image } from "../Image";
import { Block } from "@/components/Block";
import { ResponsiveLandscape } from "./ResponsiveLandscape";
import { ResponsiveSquareArt } from "./ResponsiveSquareArt";
import { Square } from "./Square";
import { LargeLeaderboard } from "./LargeLeaderboard";
import { MobileBanner } from "./MobileBanner";
import { SmallRectangle } from "./SmallRectangle";
import { VerticalBanner } from "./VerticalBanner";
import { HalfBanner } from "./HalfBanner";
import { Billboard } from "./Billboard";
import { Portrait } from "./Portrait";

export function Banner(props) {
  const { title, text, url, target, ad, display } = props;

  switch (display) {
    case "portrait":
      return (
        <Portrait ad={ad} title={title} text={text} url={url} target={target} />
      );
      break;
    case "billboard":
      return (
        <Billboard
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    case "half banner":
      return (
        <HalfBanner
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    case "vertical banner":
      return (
        <VerticalBanner
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    case "small rectangle":
      return (
        <SmallRectangle
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    case "mobile banner":
      return (
        <MobileBanner
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    case "large leaderboard":
      return (
        <LargeLeaderboard
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    case "square":
      return (
        <Square ad={ad} title={title} text={text} url={url} target={target} />
      );
      break;
    case "responsive landscape":
      return (
        <ResponsiveLandscape
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    case "responsive square art":
      return (
        <ResponsiveSquareArt
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
    default:
      return (
        <ResponsiveSquareArt
          ad={ad}
          title={title}
          text={text}
          url={url}
          target={target}
        />
      );
      break;
  }
}
