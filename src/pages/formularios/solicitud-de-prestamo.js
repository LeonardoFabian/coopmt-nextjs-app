import { FormRenderer } from "@/components/FormRenderer";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Form } from "@/api";
import { RootLayout } from "@/layouts";
import { Shared } from "@/components/Shared";
import { Container } from "semantic-ui-react";
import { Forms } from "@/components/Forms";

const formController = new Form();

export default function SolicitudDePrestamo() {
  const [formData, setFormData] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else {
      (async () => {
        try {
          const formDataResponse =
            await formController.getLoanRequestFormSchema();
          console.log("formDataResponse: ", formDataResponse);
          setFormData(formDataResponse);
        } catch (error) {
          console.log("Error al obtener los datos del formulario:", error);
        }
      })();
    }
  }, []);

  return (
    <>
      <Shared.Seo
        title={`Formulario de Solicitud de Préstamo`}
        description="Formulario de solicitud de préstamo para socios de la Cooperativa del Ministerio de Trabajo."
      />
      <RootLayout>
        <Shared.PageHeader title="Solicitud de Préstamo" />
        <Container isContainer>
          <Shared.Separator height={54} />
          {user && formData && (
            <>
              {/* <Forms.LoanRequestForm formData={formData} /> */}
              <FormRenderer
                title={"Solicitud de Prestamo"}
                formData={formData}
              />
            </>
          )}
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
