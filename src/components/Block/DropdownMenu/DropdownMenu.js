import styles from "./DropdownMenu.module.scss";
import { Icon } from "semantic-ui-react";
import { useState } from "react";
import { DropdownSection } from "./DropdownSection";
import { map } from "lodash";
import classNames from "classnames";

export function DropdownMenu({ block }) {
  console.log("Dropdown menu: ", block);
  const { heading, sections, alignment } = block;

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
          className={classNames([styles.dropdownMenu], {
            [styles.alignLeft]: alignment === "left",
            [styles.alignCenter]: alignment === "center",
            [styles.alignRight]: alignment === "right",
          })}
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
