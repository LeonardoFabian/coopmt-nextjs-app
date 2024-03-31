import styles from './HeroSection.module.scss';
import { Container } from 'semantic-ui-react';

export function HeroSection() {
    return (
        <Container fluid className={styles.heroSection}>
            <Container isContainer className={styles.content}>
                <h1>Hero Section</h1>
            </Container>
        </Container>
    )
}
