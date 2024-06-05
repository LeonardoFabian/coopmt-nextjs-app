import styles from "./home.module.scss";
import { RootLayout } from "@/layouts";
import { HomePageAPI } from "@/api";
import { useState, useEffect } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Shared } from "@/components/Shared";

const homePageController = new HomePageAPI();

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await homePageController.find();
        console.log("HomePage data: ", response);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // if (!data) return null;

  const { title, description, blocks } = data;

  return (
    <>
      <Shared.Seo />
      <RootLayout>
        <main className={styles.content}>
          <BlockRenderer blocks={blocks} />
        </main>
      </RootLayout>
    </>
  );
}
