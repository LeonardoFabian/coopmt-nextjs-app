import styles from "./Menu.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Category, MainMenu } from "@/api";
import { map } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Icon, Input } from "semantic-ui-react";
import { MenuItem } from "./MenuItem";
import { useRouter } from "next/router";

const categoryController = new Category();
const mainMenuController = new MainMenu();

export function Menu(props) {
  const { isOpenSearch } = props;

  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(isOpenSearch);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleShowSearchInput = () =>
    setShowSearchInput((prevState) => !prevState);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const response = await categoryController.find();
  //         setCategories(response.data);
  //        console.log(response);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     })();
  //   }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await mainMenuController.find();
        console.log("Menu Data: ", response);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // OLD USE EFFECT METHOD
  //   useEffect(() => {
  //     setSearchValue(router.query.s || "");
  //   }, [router.query]);

  useEffect(() => {
    setSearchValue(router.query.s || "");
  }, []);

  const onSearch = (text) => {
    // console.log(text);
    setSearchValue(text); // fix store the whitespace on input search value
    router.replace(`/search?s=${text}`);
  };

  return (
    <nav className={styles.menu}>
      <ul className={styles.wrapper}>
        <MenuItem blocks={data?.menuItems} />

        <button className={styles.searchButton} onClick={handleShowSearchInput}>
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <div
          className={classNames(styles.search, {
            [styles.active]: showSearchInput,
          })}
        >
          <Input
            id="search-input"
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
      </ul>
    </nav>
  );
}
