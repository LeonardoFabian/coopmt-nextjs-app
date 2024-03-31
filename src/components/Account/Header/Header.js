import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../User';
import styles from './Header.module.scss';
import { Container } from 'semantic-ui-react';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export function Header(props) {

    const {children} = props;

    const {user, logout} = useAuth();
    const router = useRouter();

    if(!user) {
        router.push("/");
        return null;
    }

    return (
        <Container fluid relative className={styles.header}>
            <Container isContainer className={styles.wrapper}>
                {children}
            </Container>
        </Container>
    )
}
