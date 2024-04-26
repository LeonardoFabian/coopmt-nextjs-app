import styles from "./PostCard.module.scss";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import { Button, Icon } from "semantic-ui-react";
import { DateTime } from "luxon";

export function PostCard({
  post,
  image,
  title,
  content,
  link,
  taxonomy,
  date,
}) {
  const hasTaxonomy = Boolean(post?.attributes?.taxonomy?.data?.attributes);

  return (
    <div className={styles.postCard}>
      <div className={styles.imageContainer}>
        <Shared.Image
          src={post?.attributes?.featuredImage?.data?.attributes?.url}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardData}>
          {hasTaxonomy && (
            <div className={styles.taxonomyContainer}>
              <Link
                href={`/taxonomy/${post?.attributes?.taxonomy?.data?.attributes?.slug}`}
                className={styles.taxonomyLink}
              >
                <span className={styles.taxonomy}>
                  {post?.attributes?.taxonomy?.data?.attributes?.name}
                </span>
              </Link>
            </div>
          )}
          <h5 className={styles.title}>{post?.attributes?.title}</h5>
          {/* <p className={styles.description}>
                        {
                            content.length > 150 
                            ? `${content.substring(0, 150)}...`
                            : content
                        }
                    </p> */}
          <div className={styles.postMeta}>
            <div className={styles.author}>
              <Icon name="user outline" /> Admin
            </div>
            <div className={styles.date}>
              <Icon name="calendar outline" />{" "}
              {DateTime.fromISO(post?.attributes?.publishedAt, {
                locale: "es",
              }).toFormat("DDD")}
            </div>
          </div>
        </div>
        {link && (
          <div className={styles.cardFooter}>
            {/* <Link href={link}>
                            <Button secondary>
                                Ver más <Icon name='arrow right' />
                            </Button>
                        </Link> */}
          </div>
        )}
      </div>
    </div>
  );
}
