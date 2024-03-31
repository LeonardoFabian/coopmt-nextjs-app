import styles from './Footer.module.scss'
import Link from 'next/link';
import { Container, Button, Icon } from 'semantic-ui-react';
import Image from 'next/image';
import { BottomBar } from '../BottomBar';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.columns}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <Image src="/images/logo.svg" alt='COOPMT' width="196" height="80" />
                        </Link>
                    </div>

                    <div className={styles.about}>
                        <h4>Cooperativa</h4>
                        <ul className={styles.aboutList}>
                            <Link href="#">Sobre nosotros</Link>
                            <Link href="#">Términos y condiciones</Link>
                            <Link href="#">Política de privacidad</Link>
                            <Link href="#">FAQs</Link>
                        </ul>
                    </div>

                    <div className={styles.tools}>
                        <h4>Herramientas</h4>
                        <ul className={styles.toolsList}>
                            <Link href="#">Cálculadora de préstamos</Link>
                        </ul>
                    </div>

                    <div className={styles.contactInfo}>
                        <h4>Contáctanos</h4>
                        <ul className={styles.aboutList}>
                            <Link href="#">Dirección</Link>
                            <Link href="#">Télefono</Link>
                            <Link href="#">Correo</Link>
                            <Link href="#">Horarios</Link>
                            <div className={styles.contactSubmenu}>
                                <h4>Síguenos en</h4>
                                <ul className={styles.social}>
                                    <Button as="a" href="#" circular color='facebook' icon='facebook' />
                                    <Button as="a" href="#" circular color='instagram' icon='instagram' />
                                    <Button as="a" href="#" circular color='twitter' icon='twitter' />
                                    <Button as="a" href="#" circular color='youtube' icon='youtube' />
                                </ul>
                            </div>
                        </ul>
                        
                    </div>

                </div>
            </Container>

            <BottomBar />
        </footer>
    )
}
