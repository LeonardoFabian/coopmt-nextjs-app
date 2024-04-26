import styles from './BottomBar.module.scss';
import { Container } from 'semantic-ui-react';

export function BottomBar(props) {

    const { copyright } = props;

    return (
        <div className={styles.bottomBar}>
            <Container>
                &copy; <span className={styles.currentYear}>{new Date().getFullYear()}</span>. {copyright}
            </Container>
        </div>
    )
}
