import styles from "./Footer.module.scss";
import Link from "next/link";
import { Container, Button, Icon } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { BottomBar } from "../BottomBar";
import { Option, Footer as FooterCtrl } from "@/api";
import { useState, useEffect } from "react";
import { map, size } from "lodash";

const optionController = new Option();
const footerController = new FooterCtrl();

export function Footer(props) {
  const [option, setOption] = useState(null);
  const [data, setData] = useState(null);
  // const { data } = props;

  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
        console.log("Options: ", response);
        setOption(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await footerController.find();
        console.log("Footer data: ", response);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const menus = data?.attributes?.footerMenus?.data;
  const hasMenus = size(menus) > 0;

  return (
    <footer className={styles.footer}>
      <Container className={styles.footerWrapper}>
        <div className={styles.columns}>
          <div className={styles.companyInfo}>
            {data?.attributes?.showLogo ? (
              <Shared.Logo dark={true} height="100%" />
            ) : (
              <h3>{option?.attributes?.siteTitle}</h3>
            )}
            {data?.attributes?.showCompanyInfo && (
              <div className={styles.info}>
                <p>{option?.attributes?.name}</p>

                <ul className={styles.contactInfo}>
                  <li>
                    <Icon name="envelope outline" />
                    <Link href={`mailto:${option?.attributes?.contactEmail}`}>
                      {option?.attributes?.contactEmail}
                    </Link>
                  </li>
                  <li>
                    <Icon name="phone" />
                    <Link href={`tel:${option?.attributes?.contactPhone}`}>
                      {option?.attributes?.contactPhone}
                    </Link>
                  </li>
                  <li>
                    <Icon name="whatsapp" />
                    <Link
                      href={`https://wa.me/1${option?.attributes?.contactWhatsapp}?text=Saludos,%20les%20escribo%20desde%20su%20sitio%20web,%20y%20me%20interesaría%20saber...%20`}
                    >
                      {option?.attributes?.contactWhatsapp}
                    </Link>
                  </li>
                  <li>
                    <Icon name="map marker alternate" />
                    {option?.attributes?.contactAddress}
                  </li>
                </ul>
              </div>
            )}

            {data?.attributes?.showSocialLinks &&
              size(option?.attributes?.socialLinks) > 0 && (
                <ul className={styles.social}>
                  {map(option?.attributes?.socialLinks, (socialLink) => (
                    <Button
                      as="a"
                      key={`footer-social-link-${socialLink?.id}`}
                      href={socialLink?.url}
                      target={`_blank`}
                      circular
                      icon={socialLink?.icon}
                    />
                  ))}
                </ul>
              )}
          </div>

          {hasMenus &&
            map(menus, (menu) => (
              <div>
                <h6>{menu?.attributes?.name}</h6>
                {menu?.attributes?.menuItems && (
                  <ul>
                    {map(menu?.attributes?.menuItems, (menuItem) => (
                      <li key={`footer-menu-item-${menuItem?.id}`}>
                        <Link href={`/${menuItem?.url}`}>
                          {menuItem?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </Container>

      <BottomBar
        copyright={option?.attributes?.siteTitle}
        socialLinks={option?.attributes?.socialLinks}
        showSocialLinks={data?.attributes?.showSocialLinks}
      />
    </footer>
  );
}
