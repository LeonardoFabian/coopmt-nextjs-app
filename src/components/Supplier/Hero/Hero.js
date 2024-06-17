import styles from "./Hero.module.scss";
import { Shared } from "@/components/Shared";
import { Container } from "semantic-ui-react";

export function Hero(props) {
  const { banner } = props;

  return (
    <Container fluid>
      <Shared.Banner
        title={banner?.title}
        text={banner?.text}
        url={banner?.url}
        target={banner?.target}
        ad={banner?.ad}
        display={banner?.display}
      />
    </Container>
  );
}
