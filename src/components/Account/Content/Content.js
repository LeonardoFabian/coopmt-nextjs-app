import styles from './Content.module.scss';
import { Sidebar, Icon, Menu, Segment, Header, SidebarPushable, Grid, GridColumn, SegmentGroup, MenuItem, SidebarPusher } from 'semantic-ui-react';
import { map } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const items = [
    {id: 1, name: 'home', text: 'Principal', link: '#', icon: 'home'},
    {id: 2, name: 'products', text: 'Productos', link: '#', icon: 'handshake'},
    {id: 3, name: 'applications', text: 'Solicitudes', link: '#', icon: 'file alternate'},
    {id: 4, name: 'settings', text: 'Ajustes', link: '#', icon: 'cog'},
];

export function Content(props) {

    const {children} = props;

    const [visible, setVisible] = useState(false);
    const [activeItem, setActiveItem] = useState('home');

    const handleShowMenu = () => setVisible((prevState) => !prevState);

    const handleItemClick = (e, {name}) => setActiveItem(name);

    return (
        <>
            <SidebarPushable as={SegmentGroup} raised className={styles.AccountSidebar}>
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
                    {children}
                </SidebarPusher>
                
            </SidebarPushable>
        </>
    )
}
