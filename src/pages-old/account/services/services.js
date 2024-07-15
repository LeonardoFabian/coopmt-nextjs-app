import styles from "./services.module.scss";
import { AccountLayout } from "@/layouts";
import { Header } from "@/components/Account";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Container, Tab } from "semantic-ui-react";
import { Shared } from "@/components/Shared";

export default function ServicesPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const panes = [
    {
      menuItem: { key: 1, icon: "clipboard check", content: "Mis servicios" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Aqui mis servicios</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 2, icon: "clipboard list", content: "Solicitudes" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Aqui listado de servicios</p>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Shared.Seo title={`Mis servicios`} />
      <AccountLayout relative className={styles.servicesPage}>
        <Header>
          <h2>Servicios</h2>
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
