import styles from "./FileUpload.module.scss";
import { Form } from "semantic-ui-react";
import { useState } from "react";
import { Shared } from "@/components/Shared";

export function FileUpload({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) {
  const [documentIdFrontSrc, setDocumentIdFrontSrc] = useState(
    "/images/document-id-front.png"
  );
  const [documentIdBackSrc, setDocumentIdBackSrc] = useState(
    "/images/document-id-back.png"
  );

  const handleDocumentIdFrontSelect = (e, { name, value }) => {
    // console.log(e.currentTarget.files[0]);
    setFieldValue(name, e.currentTarget.files[0]);
  };

  const handleDocumentIdBackSelect = (e, { name, value }) => {
    setFieldValue(name, e.currentTarget.files[0]);
  };

  return (
    <div className={styles.fileUpload}>
      <h5>Archivos requeridos</h5>
      <Shared.Alert
        className="warning"
        text="Para que podamos validar tus datos, necesitarás subir una foto de tu cédula de ambos lados (frente y reverso)."
      />
      <Form.Group>
        <div>
          <img className={styles.front} src={documentIdFrontSrc} />
          <Form.Input
            type="file"
            name="documentIdFront"
            label="Cédula de identidad (Frente)"
            onChange={handleDocumentIdFrontSelect}
            error={errors?.documentIdFront}
          />
        </div>
        <div>
          <img className={styles.front} src={documentIdBackSrc} />

          <Form.Input
            type="file"
            name="documentIdBack"
            label="Cédula de identidad (Reverso)"
            onChange={handleDocumentIdBackSelect}
            error={errors?.documentIdBack}
          />
        </div>
      </Form.Group>
    </div>
  );
}
