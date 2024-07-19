import styles from "./ProductCard.module.scss";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import { Button, Icon, Loader } from "semantic-ui-react";
import { DateTime } from "luxon";
import { Suspense } from "react";
import numeral from "numeral";
import { fn } from "@/utils";

export function ProductCard(props) {
  const { productId, title, slug, image, price, discount, supplier } = props;

  const hasDiscount = discount > 0;
  const priceToPay = fn.calcDiscount(price, discount);

  return (
    // <Suspense fallback={<Skeleton />}>
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Shared.Image src={image?.data?.attributes?.url} />
        {hasDiscount && (
          <span className={styles.discount}>{`-${discount}`}% OFF</span>
        )}

        <span className={styles.wishlistBtn}>
          <Shared.AddToWishlist
            productId={productId}
            className={styles.wishlist}
          />
        </span>
      </div>
      <div className={styles.cardBody}>
        <Link href={`/afiliados/${supplier?.data?.attributes?.slug}/${slug}`}>
          <h5 className={styles.title}>{title}</h5>
        </Link>

        <div className={styles.supplierContainer}>
          <Link
            href={`/afiliados/${supplier?.data?.attributes?.slug}`}
            className={styles.supplierLink}
          >
            <span className={styles.supplier}>
              {supplier?.data?.attributes?.name}
            </span>
          </Link>
        </div>

        <div className={styles.cardData}>
          <div className={styles.meta}>
            <div className={styles.price}>
              <p>Desde</p>
              <p className={styles.corePrice}>
                <span className={styles.priceToPay}>
                  {`RD$${numeral(priceToPay).format("0,0")} `}
                </span>
                {hasDiscount && (
                  <>
                    <span className={styles.regularPrice}>
                      {`RD$${numeral(price).format("0,0")}`}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <Shared.AddToCart productId={productId} />
        </div>
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
