import { useState } from "react";
import { Header, Settings, Address } from "@/components/Account";
import { AccountLayout, RootLayout } from "@/layouts";
import { Container, Tab } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { Shared } from "@/components/Shared";
import styles from "./settings.module.scss";
import { useRouter } from "next/router";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  if (!user) {
    router.push("/");
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: { key: 20, icon: "user", content: "Datos personales" },
      render: () => (
        <Tab.Pane attached={false}>
          <Settings.UserData />
          <Shared.Separator height={30} />
          <div className={styles.formsContainer}>
            <Settings.UserEmailSettings />
            <Settings.UserPasswordSettings />
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 21, icon: "id card", content: "Cuenta" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Cuentas</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 22, icon: "users", content: "Beneficiarios" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Beneficiarios</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 23, icon: "address book", content: "Contacto" },
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload} />
          <Address.AddressList reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 24,
        icon: "log out",
        content: "",
        onClick: logout,
      },
    },
  ];

  return (
    <>
      <AccountLayout relative className={styles.settings}>
        <Header>
          <h1>Ajustes</h1>
        </Header>
        <Container isContainer className={styles.mainContent}>
          <div className={styles.content}>
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={panes}
              className={styles.tabs}
            />
          </div>
        </Container>
      </AccountLayout>
    </>
  );
}
