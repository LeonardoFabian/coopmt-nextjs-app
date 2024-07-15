import styles from "./StepFinal.module.scss";
import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRef, forwardRef } from "react";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Option } from "@/api";
import { useState, useEffect } from "react";
import { Shared } from "@/components/Shared";
import { Preview } from "./Preview";

const optionController = new Option();

export function StepFinal({ values }) {
  console.log("Values: ", values);

  const [options, setOptions] = useState(null);
  const componentRef = useRef();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
        console.log("Preview options response: ", response);
        setOptions(response.data);
      } catch (error) {
        console.error("Options request error: ", error);
      }
    })();
  }, []);

  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save(`solicitud-afiliacion.pdf`);
  };

  const PreviewRef = forwardRef(({ values }, ref) => (
    <div ref={ref}>
      <Preview values={values} />
    </div>
  ));

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <div className={styles.step}>
        <Icon name="check circle outline" />
        <div className={styles.content}>
          <h5 className={styles.heading}>Confirmación de Envío</h5>
          <p>¡Gracias por enviar su solicitud de afiliación!</p>
          <p>
            Nos complace informarle que hemos recibido correctamente su
            solicitud. Nuestro equipo revisará la información proporcionada y se
            pondrá en contacto con usted en breve para continuar con el proceso.
          </p>
          <p>
            Apreciamos su interés en formar parte de nuestra familia y le
            agradecemos su paciencia mientras revisamos su solicitud.
          </p>
        </div>
        <div className={styles.actions}>
          <Button as={Link} href="/" className={styles.btnHome}>
            <Icon name="home" /> Volver al inicio
          </Button>
          <Button
            type="button"
            primary
            className={styles.btnView}
            onClick={handleShowModal}
          >
            <Icon name="file alternate outline" /> Ver
          </Button>
        </div>
      </div>
      {showModal && (
        <Shared.AppModal
          show={showModal}
          width={1200}
          onClose={handleShowModal}
        >
          <PreviewRef values={values} ref={componentRef} />
          <div className={styles.modalActions}>
            <ReactToPrint
              trigger={() => (
                <Button type="button">
                  <Icon name="print" />
                  Imprimir
                </Button>
              )}
              content={() => componentRef.current}
            />
            <Button type="button" onClick={handleDownloadPDF}>
              <Icon name="download" />
              Descargar
            </Button>
          </div>
        </Shared.AppModal>
      )}
    </>
  );
}
