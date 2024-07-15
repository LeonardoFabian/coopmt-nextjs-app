import styles from "./StepSix.module.scss";
import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";

export function StepSix() {
  return (
    <div className={styles.stepThree}>
      <Icon name="check circle outline" />
      <div className={styles.content}>
        <h5 className={styles.heading}>Confirmación de Envío</h5>
        <p>¡Gracias por enviar su solicitud de afiliación!</p>
        <p>
          Nos complace informarle que hemos recibido correctamente su solicitud.
          Nuestro equipo revisará la información proporcionada y se pondrá en
          contacto con usted en breve para continuar con el proceso.
        </p>
        <p>
          Apreciamos su interés en formar parte de nuestra familia y le
          agradecemos su paciencia mientras revisamos su solicitud.
        </p>
      </div>
      <div className={styles.actions}>
        <Button as={Link} href="/" primary className={styles.action}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
