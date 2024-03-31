import styles from './BottomBar.module.scss';
import { Container } from 'semantic-ui-react';

export function BottomBar() {
    return (
        <div className={styles.bottomBar}>
            <Container>
                &copy; <span className={styles.currentYear}>{new Date().getFullYear()}</span>. Your Company Name. All rights reserved. 
            </Container>
        </div>
    )
}
