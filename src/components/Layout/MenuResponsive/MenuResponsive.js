import { Block } from "@/components/Block";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Icon, Input } from "semantic-ui-react";
import { SideMenu } from "./SideMenu";
import classNames from "classnames";
import styles from "./MenuResponsive.module.scss";

export function MenuResponsive(props) {
  const { isOpenSearch } = props;
  const { user } = useAuth();

  const [showSearchInput, setShowSearchInput] = useState(isOpenSearch);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  /**
   * Toggle the visibility of the search input
   */
  const handleShowSearchInput = () => {
    setShowSearchInput((prevState) => !prevState);
  };

  const handleShowSideMenu = () => setShowSideMenu((prevState) => !prevState);

  const onSearch = (text) => {
    // console.log(text);
    setSearchValue(text); // fix store the whitespace on input search value
    router.replace(`/search?s=${text}`);
  };

  /**
   * Redirect to the notifications page
   */
  const goToNotifications = () => {
    router.push("/notificaciones");
  };

  const goToCart = () => {
    router.push("/cart");
  };

  return (
    <>
      <div className={styles.menuResponsive}>
        {/* search */}
        <button
          type="button"
          className={styles.searchButton}
          onClick={handleShowSearchInput}
        >
          <Block.MaterialIcon icon="search" />
        </button>
        {/* notifications */}
        {user && (
          <button
            type="button"
            className={styles.notifications}
            onClick={goToNotifications}
          >
            <Block.MaterialIcon icon="notifications" />
          </button>
        )}
        {/* shopping cart */}
        {user && (
          <button type="button" className={styles.cart} onClick={goToCart}>
            <Block.MaterialIcon icon="shopping_cart" />
          </button>
        )}
        {/* menu */}
        <button
          type="button"
          onClick={handleShowSideMenu}
          className={styles.menu}
        >
          <Block.MaterialIcon icon="menu" />
        </button>
      </div>

      {/* search input */}
      <div
        className={classNames(styles.search, {
          [styles.active]: showSearchInput,
        })}
      >
        <Input
          id="search-input-responsive"
          placeholder="Buscar"
          className={styles.searchInput}
          focus={true}
          value={searchValue}
          onChange={(_, data) => onSearch(data.value)}
        />
        <div className={styles.closeInput}>
          <FontAwesomeIcon icon={faClose} onClick={handleShowSearchInput} />
        </div>
      </div>

      {/* side menu */}
      {showSideMenu && <SideMenu showSideMenu={showSideMenu} />}
    </>
  );
}
