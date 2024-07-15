import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { AffiliationForm } from "@/components/Auth";
import { useRouter } from "next/router";

export default function AffiliationPage() {
  const router = useRouter();

  const {
    query: { step = 1 },
  } = useRouter();

  const currentStep = Number(step);

  return (
    <>
      <Shared.Seo
        title={`Formulario de afiliación`}
        description="Formulario de afiliación de la Cooperativa del Ministerio de Trabajo."
      />
      <RootLayout>
        <Shared.PageHeader title="Solicitud de Afiliación" />
        <Container isContainer>
          <Shared.Separator height={54} />
          {/* <AffiliationForm.Header /> */}
          {/* {currentStep === 1 && <AffiliationForm.StepOne />} */}
          <AffiliationForm />
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
