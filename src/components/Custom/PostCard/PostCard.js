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
          {/* <p className={styles.description}>
                        {
                            content.length > 150 
                            ? `${content.substring(0, 150)}...`
                            : content
                        }
                    </p> */}
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
    // </Suspense>
  );
}

// function Skeleton() {
//   return (
//     <div className={styles.skeleton}>
//       <div className={styles.skeletonImageContainer}>
//         <Icon name="image outline"/>
//       </div>
//       <div className={styles.skeletonCardBody}>
//         <div className={styles.skeletonCardData}>
//           {hasTaxonomy && (
//             <div className={styles.skeletonTaxonomyContainer}>
//               <Link
//                 href={`/taxonomy/${post?.attributes?.taxonomy?.data?.attributes?.slug}`}
//                 className={styles.taxonomyLink}
//               >
//                 <span className={styles.taxonomy}>
//                   {post?.attributes?.taxonomy?.data?.attributes?.name}
//                 </span>
//               </Link>
//             </div>
//           )}
//           <h5 className={styles.title}>{post?.attributes?.title}</h5>
//           {/* <p className={styles.description}>
//                       {
//                           content.length > 150
//                           ? `${content.substring(0, 150)}...`
//                           : content
//                       }
//                   </p> */}
//           <div className={styles.postMeta}>
//             <div className={styles.author}>
//               <Icon name="user outline" /> Admin
//             </div>
//             <div className={styles.date}>
//               <Icon name="calendar outline" />{" "}
//               {DateTime.fromISO(post?.attributes?.publishedAt, {
//                 locale: "es",
//               }).toFormat("DDD")}
//             </div>
//           </div>
//         </div>
//         {link && (
//           <div className={styles.cardFooter}>
//             {/* <Link href={link}>
//                           <Button secondary>
//                               Ver más <Icon name='arrow right' />
//                           </Button>
//                       </Link> */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
