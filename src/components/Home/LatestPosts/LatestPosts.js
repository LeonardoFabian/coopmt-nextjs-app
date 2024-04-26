import styles from "./LatestPosts.module.scss";
import { Container, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { Post } from "@/api";
import { Shared } from "@/components/Shared";
import { map } from "lodash";
import { Custom } from "@/components/Custom";
import Link from "next/link";

const postController = new Post();

export function LatestPosts({ data }) {
  const { heading, subheading, link } = data;

  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const limit = 3;
        const response = await postController.getLatestPublished(limit);
        console.log("LATEST POSTS: ", response);
        setLatestPost(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container fluid className={styles.latestPosts}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subHeading}>{subheading}</p>

        <div className={styles.content}>
          <Shared.Grid cols="3" gap="30px">
            {map(latestPost, (post) => (
              <Custom.PostCard key={post.id} post={post} />
            ))}
          </Shared.Grid>
        </div>
        <div className={styles.actions}>
          <Link href={link.url} target={link.target || "_self"}>
            <Button primary>{link.label}</Button>
          </Link>
        </div>
      </Container>
    </Container>
  );
}
