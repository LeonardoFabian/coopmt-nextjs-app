import styles from './Logo.module.scss';
import Link from 'next/link';
import { Image } from '../Image';

export function Logo(props) {

    const { image, text, link, dark = false } = props;

    return (
        <>
            {
                image?.url
                ? (
                    <Link href={link || "/"} className={styles.logo}>
                        <Image src={image?.url} alt="Logo" height="80" width="196" />
                    </Link>
                )
                : (
                    <Link href={text?.url || '/'} target={text?.target} className={styles.logo}>
                        {
                            text?.icon?.url 
                            ? <Image src={text?.icon?.url} alt={text?.icon?.alternativeText} height="80" width="196" />
                            : null
                        }
                        <h3>{text?.label}</h3>
                    </Link>
                )
            }
        </>
    )
}
