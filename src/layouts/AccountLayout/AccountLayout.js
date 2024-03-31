import styles from './AccountLayout.module.scss';
import { RootLayout } from '../RootLayout';
import { Content, Header } from '@/components/Account';
import { 
    Container,
    Grid, 
    GridColumn, 
    SidebarPushable, 
    Sidebar, 
    SidebarPusher,
    Menu, 
    MenuItem,
    Icon,
    SegmentGroup,
    Segment
} from 'semantic-ui-react';
import { useState } from 'react';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TopBar } from '@/components/Layout';
import classNames from 'classnames';

const items = [
    {id: 2, name: 'products', text: 'Productos', link: '#', icon: 'handshake'},
    {id: 3, name: 'applications', text: 'Solicitudes', link: '#', icon: 'file alternate'},
    {id: 4, name: 'settings', text: 'Ajustes', link: '/settings', icon: 'cog'},
];

export function AccountLayout(props) {
    
    const { 
        children ,
        isOpenSearch = false,
        isContainer = false,
        relative = false
    } = props;
    const router = useRouter();

    const [visible, setVisible] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    /**
     * Hide or display the menu
     * @returns 
     */
    const handleShowMenu = () => setVisible((prevState) => !prevState);

    /**
     * Set the current menu item
     * @param event e 
     * @param string name 
     * @returns 
     */
    const handleItemClick = (e, {name}) => {
        goToAccountPage(name);
        setActiveItem(name);
    };

    const goToAccountPage = (link) => {
        router.push(`/account/${link}`);
    } 

    return (
        <>
            {/* <RootLayout relative> */}

                <TopBar isOpenSearch={isOpenSearch} />

                <Container fluid>
                    <div className={classNames({ [styles.relative]: relative })}>                        

                        <SidebarPushable 
                            as={SegmentGroup} 
                            raised 
                            className={styles.accountSidebar}
                        >
                            
                            <Sidebar 
                                as={Menu}
                                animation='push'
                                icon='labeled'
                                inverted
                                onHide={() => setVisible(false)}
                                vertical
                                visible={visible}
                                width='thin'
                            >
                                <MenuItem
                                    key="1" as='a'
                                    name="/"
                                    active={activeItem === 'account/'}
                                    onClick={handleItemClick}
                                >
                                    <Icon name="home" /><span>Inicio</span>
                                </MenuItem>
                                {map(items, (item) => (
                                    <MenuItem
                                        key={item.id} as='a'
                                        name={item.name}
                                        active={activeItem === item.name}
                                        onClick={handleItemClick}
                                    >
                                        <Icon name={item.icon} /><span>{item.text}</span>
                                    </MenuItem>
                                ))}
                            </Sidebar>

                            <SidebarPusher dimmed={visible} className={styles.sidebarPusher}>

                                <div className={styles.mainContentHeader}>
                                    <Container isContainer className={styles.mainContentHeaderWrapper}>
                                        <div fluid className={styles.mainContentHeaderOptions}>
                                            <button className={styles.menuToggleButton} onClick={handleShowMenu}>
                                                <FontAwesomeIcon icon={faBars} size='xl' />
                                            </button>
                                        </div>
                                    </Container>
                                </div>

                                {children}

                            </SidebarPusher>  

                        </SidebarPushable>
                    </div>
                </Container>

            {/* </RootLayout> */}
        </>
    )
}
