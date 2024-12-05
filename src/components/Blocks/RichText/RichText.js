import styles from "./RichText.module.scss";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Shared } from "@/components/Shared";
import Link from "next/link";

export function RichText({ content }) {
  return (
    <BlocksRenderer
      content={content}
      className={styles.richText}
      blocks={{
        paragraph: ({ children }) => (
          <p className={styles.paragraph}>{children}</p>
        ),
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className={styles.h1}>{children}</h1>;
            case 2:
              return <h2 className={styles.h2}>{children}</h2>;
            case 3:
              return <h3 className={styles.h3}>{children}</h3>;
            case 4:
              return <h4 className={styles.h4}>{children}</h4>;
            case 5:
              return <h5 className={styles.h5}>{children}</h5>;
            case 6:
              return <h6 className={styles.h6}>{children}</h6>;
          }
        },
        link: ({ children, url }) => (
          <Link href={url} className={styles.link}>
            {children}
          </Link>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => (
          <span className={styles.italic}>{children}</span>
        ),
        underline: ({ children }) => (
          <span className={styles.underline}>{children}</span>
        ),
        strikethrough: ({ children }) => (
          <span className={styles.strikethrough}>{children}</span>
        ),
        code: ({ children }) => <code className={styles.code}>{children}</code>,
        inlineCode: ({ children }) => (
          <code className={styles.inlineCode}>{children}</code>
        ),
      }}
    />
  );
}
