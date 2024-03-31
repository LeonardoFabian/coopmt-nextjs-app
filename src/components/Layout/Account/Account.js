import styles from './Account.module.scss';
import { Button, Label } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import classNames from 'classnames';
import { faArrowRightToBracket, faCartShopping, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const totalCartItems = 5;

export function Account() {

    const {user} = useAuth();
    const router = useRouter();

    const goToLogin = () => router.push("/auth/login");
    const goToAccount = () => router.push("/account");
    const goToCart = () => {
        if(!user) {
            goToLogin();
        } else {
            router.push("/cart");
        }
    }

    return (
        <div className={styles.account}>
            <Button className={styles.cart} onClick={goToCart}>
                <FontAwesomeIcon icon={faCartShopping} />
                {totalCartItems > 0 && <Label circular>{totalCartItems > 9 ? '9+' : totalCartItems}</Label>}
            </Button>

            <Button primary className={classNames({[styles.user]: user})} onClick={!user ? goToLogin : goToAccount}>
                <FontAwesomeIcon icon={!user ? faArrowRightToBracket : faUserCircle} />
                {!user ? 'Ingresar': `${user.firstName} ${user.lastName}` }
            </Button>

            {/* {!user ? (
                <Button primary className={styles.login} onClick={goToLogin}>
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    Ingresar
                </Button>
            ) : (
                <Button className={styles.user} onClick={goToAccount}>
                    <FontAwesomeIcon icon={faUserCircle} />
                    Leonardo Fabian
                </Button>
            )} */}
        </div>
    )
}
