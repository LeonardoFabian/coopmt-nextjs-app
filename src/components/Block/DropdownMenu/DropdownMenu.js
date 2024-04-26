import styles from "./DropdownMenu.module.scss";
import { Icon } from "semantic-ui-react";
import { useState } from "react";
import { DropdownSection } from "./DropdownSection";
import { map } from "lodash";

export function DropdownMenu({ block }) {
  const { heading, sections } = block;

  const [isOpen, setIsOpen] = useState(false);

  const togglingMenu = () => setIsOpen((prevState) => !prevState);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.dropdownButton}
      >
        <span className={styles.label}>{heading}</span>
        <Icon name="caret down" />
      </button>
      {sections?.data?.length !== 0 && isOpen && (
        <div
          className={styles.dropdownMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {map(sections?.data, (section) => (
            <DropdownSection key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
