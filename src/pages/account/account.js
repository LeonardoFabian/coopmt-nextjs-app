import { Content, Header, Settings } from "@/components/Account";
import { AccountLayout, RootLayout } from "@/layouts";
import styles from './account.module.scss';
import {Container, Tab} from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { User } from "@/components/Account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function AccountPage() {

    const {logout} = useAuth();

    const panes = [
        {
            menuItem: "Cuentas",
            render: () => (
                <Tab.Pane attached={false}>
                    <p>Cuentas</p>
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Préstamos",
            render: () => (
                <Tab.Pane attached={false}>
                    <p>Préstamos</p>
                </Tab.Pane>
            )
        },
        {
            menuItem: "Facilidades",
            render: () => (
                <Tab.Pane attached={false}>
                    <p>Facilidades</p>
                </Tab.Pane>
            ),
        },

        {
            menuItem: {icon: 'settings', content: 'Ajustes'},
            render: () => (
                <Tab.Pane attached={false}>
                    <Settings.UserData />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                icon: "logout",
                content: "",
                onClick: logout,
            }
        }
    ];

    return (
        <>
            <AccountLayout relative className={styles.account}>
                <Header>
                    <User />
                    <div>
                        <button onClick={logout} className={styles.logout}>
                            Cerrar sesión
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </button>
                    </div>
                </Header>
                <Container isContainer className={styles.content}>
                    
                    {/* <Content /> */}
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} className={styles.tabs} />
                </Container>
            </AccountLayout>
        </>
    )
}
