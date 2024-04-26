import styles from "./DropdownSection.module.scss";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Link } from "../../Link";
import { map } from "lodash";

export function DropdownSection({ section }) {
  return (
    <div className={styles.dropdownSection}>
      {section?.heading && section?.showHeading && (
        <span className={styles.heading}>{section.heading}</span>
      )}

      {section?.components?.length !== 0 && (
        <BlockRenderer blocks={section.components} />
      )}

      {map(section?.links, (link) => (
        <Link key={link.id} block={link} />
      ))}
    </div>
  );
}
