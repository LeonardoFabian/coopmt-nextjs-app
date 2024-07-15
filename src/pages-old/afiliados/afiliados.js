import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { map, size } from "lodash";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import Link from "next/link";

export default function AfiliadosPage(props) {
  console.log("AfiliadosPage props: ", props);

  const { suppliers } = props;
  const hasSuppliers = size(suppliers) > 0;

  return (
    <>
      <Shared.Seo
        title={`COOPMT - Afiliados`}
        description="Suplidores autorizados"
      />
      <RootLayout>
        <Shared.PageHeader title="Afiliados" />
        <Container isContainer>
          <Shared.Separator height={54} />
          {hasSuppliers ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(suppliers, (supplier) => (
                  <Custom.SupplierCard
                    key={supplier.id}
                    supplierId={supplier.id}
                    name={supplier.attributes.name}
                    slug={supplier.attributes.slug}
                    logo={supplier.attributes.logo}
                    featuredImage={supplier?.attributes?.featuredImage}
                    information={supplier?.attributes?.information}
                    socialNetworks={supplier?.attributes?.socialNetworks}
                  />
                ))}
              </Shared.Grid>
            </>
          ) : (
            <Shared.NoResult text="Por el momento no tenemos afiliados registrados." />
          )}
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
