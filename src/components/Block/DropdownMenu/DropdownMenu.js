import styles from "./DropdownMenu.module.scss";
import { Icon } from "semantic-ui-react";
import { useState, useEffect, useRef } from "react";
import { DropdownSection } from "./DropdownSection";
import { map } from "lodash";
import classNames from "classnames";

export function DropdownMenu({ block }) {
  console.log("Dropdown menu: ", block);
  const { heading, sections, alignment } = block;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const togglingMenu = () => setIsOpen((prevState) => !prevState);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button
        type="button"
        onClick={togglingMenu}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
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
          // onMouseEnter={handleMouseEnter}
          onClick={togglingMenu}
          // onMouseLeave={handleMouseLeave}
        >
          {map(sections?.data, (section) => (
            <DropdownSection key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
