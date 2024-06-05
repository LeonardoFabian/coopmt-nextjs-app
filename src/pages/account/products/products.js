import styles from "./products.module.scss";
import { AccountLayout } from "@/layouts";
import { Header, Products } from "@/components/Account";
import { Container, Tab } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Shared } from "@/components/Shared";

export default function ProductsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const panes = [
    {
      menuItem: { key: 1, icon: "clipboard check", content: "Mis productos" },
      render: () => (
        <Tab.Pane attached={false}>
          {/* <Shared.Separator height={54} /> */}
          <Products.Orders />
          <Shared.Separator height={54} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 2, icon: "clipboard list", content: "Solicitudes" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Aqui lista de solicitudes</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 3, icon: "heart", content: "Lista de deseos" },
      render: () => (
        <Tab.Pane attached={false}>
          <Shared.Separator height={30} />
          <h3>Lista de deseos</h3>
          <Shared.Separator height={30} />
          <Products.Wishlist />
          <Shared.Separator height={30} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 4, icon: "ban", content: "Solicitudes rechazadas" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Aqui solicitudes rechazadas</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 5, icon: "bullhorn", content: "Reclamaciones" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Aqui reclamaciones</p>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Shared.Seo title={`Mis productos`} />
      <AccountLayout relative className={styles.productsPage}>
        <Header>
          <h2>Productos</h2>
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
