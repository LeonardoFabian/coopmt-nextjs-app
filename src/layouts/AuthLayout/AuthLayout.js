import styles from "./AuthLayout.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Event } from "@/api";
import { useEffect, useState } from "react";
import { Shared } from "@/components/Shared";
import Slider from "react-slick";
import { map } from "lodash";
import numeral from "numeral";

const eventController = new Event();

export function AuthLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState({});

  // if user is authenticated, redirect to home
  // console.log("user: ", user);

  // if (user) {
  //   router.push("/");
  //   // return null;
  // }

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const eventResponse = await eventController.getPublishedEvents();
          // console.log("eventResponse: ", eventResponse);
          setEvents(eventResponse);
        } catch (error) {
          console.error("Error fetching events: ", error);
        }
      })();
    }
  }, []);

  const options = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    arrows: false,
    className: styles.slickSlider,
  };

  return (
    <>
      {!user && (
        <div className={styles.authLayout}>
          <div className={styles.container}>
            <div className={styles.left}>{children}</div>
            <div className={styles.right}>
              {events?.data && (
                <div className={styles.events}>
                  <Slider {...options}>
                    {map(events?.data, (event) => {
                      {
                        /* console.log("event: ", event); */
                      }
                      const image = event?.attributes?.featuredImage?.data;
                      const imageUrl = image?.attributes?.url;
                      const imageAlt = image?.attributes?.alternativeText;
                      const title = event?.attributes?.title;
                      const slug = event?.attributes?.slug;
                      const startDate = event?.attributes?.startDate;
                      const endDate = event?.attributes?.endDate;
                      const priceTitle = event?.attributes?.priceTitle;
                      const prices = event?.attributes?.prices?.data;
                      const readableDate = event?.attributes?.humanReadableDate;
                      const readableTime = event?.attributes?.humanReadableTime;

                      {
                        /* console.log(prices); */
                      }
                      return (
                        <div key={event.id} className={styles.event}>
                          <Shared.Image
                            src={imageUrl}
                            alt={imageAlt || "Imagen del evento"}
                          />
                          <div className={styles.eventOverlay}></div>
                          <div className={styles.eventContent}>
                            <div className={styles.eventInfo}>
                              <h6 className={styles.eventTitle}>{title}</h6>
                              {readableDate && (
                                <span className={styles.eventDate}>
                                  {readableDate}
                                </span>
                              )}
                              {readableTime && (
                                <span className={styles.eventTime}>
                                  {readableTime}
                                </span>
                              )}
                            </div>
                            {prices && (
                              <div>
                                {priceTitle && (
                                  <span className={styles.eventPriceTitle}>
                                    {priceTitle}
                                  </span>
                                )}

                                <ul className={styles.eventPrices}>
                                  {map(prices, (price) => {
                                    const label = price?.attributes?.label;
                                    const amount = price?.attributes?.value;
                                    return (
                                      <li key={price.id}>
                                        {label}: RD$
                                        <span className={styles.eventPrice}>
                                          {numeral(amount).format("0,0")}
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              )}
              <div className={styles.topBar}>
                <Link href="/" className={styles.close}>
                  <FontAwesomeIcon
                    icon={faClose}
                    size="xl"
                    inverse
                    className="highlight"
                  />
                </Link>
                {/* <Link href="/"><Icon name="close" /></Link> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
