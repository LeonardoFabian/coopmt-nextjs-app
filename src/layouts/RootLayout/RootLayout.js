import styles from './RootLayout.module.scss';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames';
import { Footer, TopBar } from '@/components/Layout';

export function RootLayout(props) {

    const {
        children, 
        isOpenSearch = false, 
        isContainer = false, 
        relative = false
    } = props;

    return (
        <>
            {/* TopBar */}
            <TopBar isOpenSearch={isOpenSearch} />

            <Container fluid>
                <div className={classNames({ [styles.relative]: relative })}>
                    {isContainer ? <Container>{children}</Container> : children}
                </div>
            </Container>

            {/* Footer */}
            <Footer />
        </>
    )
}