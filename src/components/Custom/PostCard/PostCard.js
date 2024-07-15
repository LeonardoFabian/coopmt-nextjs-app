import styles from "./PostCard.module.scss";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import { Button, Icon } from "semantic-ui-react";
import { DateTime } from "luxon";
import { Suspense } from "react";

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
  const postType = post?.attributes?.post_type?.data;

  return (
    // <Suspense fallback={<Skeleton />}>
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
          <Link
            href={`/publicaciones/${postType?.attributes?.slug}/${post?.attributes?.slug}`}
          >
            <h5 className={styles.title}>{post?.attributes?.title}</h5>
          </Link>

          <div className={styles.postMeta}>
            <div className={styles.author}>
              <Icon name="user outline" /> <small>Admin</small>
            </div>
            <div className={styles.date}>
              <Icon name="calendar outline" />
              <small>
                {DateTime.fromISO(post?.attributes?.publishedAt, {
                  locale: "es",
                }).toFormat("DDD")}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
