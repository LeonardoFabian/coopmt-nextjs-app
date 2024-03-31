import styles from './Menu.module.scss';
import { useState, useEffect } from 'react';
import { Category } from '@/api';
import { map } from 'lodash';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Icon, Input } from 'semantic-ui-react';
import classNames from 'classnames';

const categoryController = new Category();

export function Menu(props) {

    const {isOpenSearch} = props;
    const [categories, setCategories] = useState(null);
    const [showSearchInput, setShowSearchInput] = useState(false);

    const handleShowSearchInput = () => setShowSearchInput((prevState) => !prevState);

    useEffect(() => {
        (async () => {
            try {
                const response = await categoryController.find();
                setCategories(response.data);
                // console.log(response);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return (
        <nav className={styles.menu}>
            <ul className={styles.wrapper}>
                {map(categories, (category) => (
                    <Link key={category.id} href={`/servicios/${category.attributes.slug}`} className={styles.item}>
                        {category.attributes.name}
                    </Link>
                ))}
                {/* <li className={styles.item}>Item 1</li>
                <li className={styles.item}>Item 2</li>
                <li className={styles.item}>Item 3</li> */}

                <button className={styles.searchButton} onClick={handleShowSearchInput}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                <div className={classNames(styles.search, { [styles.active]: showSearchInput })}>
                    <Input 
                        id="search-input" 
                        placeholder="Buscar" 
                        className={styles.searchInput} 
                        focus={true} 
                    />
                    <div className={styles.closeInput}>
                        <FontAwesomeIcon 
                            icon={faClose}                               
                            onClick={handleShowSearchInput}
                        />
                    </div>
                </div>
            </ul>
        </nav>
    )
}
