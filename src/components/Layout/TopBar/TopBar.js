import Link from 'next/link';
import styles from './TopBar.module.scss';
import Image from 'next/image';
import { Account } from '../Account';
import { Menu } from '../Menu';

export function TopBar(props) {

    const {isOpenSearch} = props;

    return (
        <div className={styles.topBar}>

            {/* left */}

            <div className={styles.left}>
                <Link href="/">
                    <Image src="/images/logo.svg" alt='COOPMT' fill />
                </Link>
            </div>

            {/* right */}

            <div className={styles.right}>
                <Menu isOpenSearch={isOpenSearch} />
                <Account />
            </div>
        </div>
    )
}
