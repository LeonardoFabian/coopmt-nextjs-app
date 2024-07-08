import styles from "./BeneficiaryForm.module.scss";
import { Form, TextArea } from "semantic-ui-react";
import { map } from "lodash";
import { Shared } from "@/components/Shared";

export function BeneficiaryForm({
  index,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) {
  const beneficiaryRelationshipOptions = [
    { key: "conyuge", text: "Conyuge", value: "conyuge" },
    { key: "padre", text: "Padre", value: "padre" },
    { key: "madre", text: "Madre", value: "madre" },
    { key: "hermano", text: "Hermano", value: "hermano" },
    { key: "hermana", text: "Hermana", value: "hermana" },
    { key: "hijo", text: "Hijo", value: "hijo" },
    { key: "hija", text: "Hija", value: "hija" },
    { key: "amistosa", text: "Amistosa", value: "amistosa" },
    { key: "otro", text: "Otro parentesco", value: "otro" },
  ];

  const handleBeneficiaryRelationshipSelect = (e, { name, value }) => {
    setFieldValue(name, value);
  };

  return (
    <div className={styles.beneficiares}>
      <h6>Beneficiario {index + 1}</h6>
      <Shared.Separator height={30} />
      <Form.Group widths="equal">
        <Form.Input
          type="text"
          name={`beneficiaries[${index}].beneficiaryDocumentId`}
          label="Cédula"
          placeholder="Cédula de identidad"
          width={4}
          value={values?.beneficiaryDocumentId}
          onChange={handleChange}
          error={errors?.beneficiaryDocumentId}
        />
        <Form.Input
          width={8}
          type="text"
          name={`beneficiaries[${index}].beneficiaryFirstName`}
          label="Nombre"
          placeholder="Nombre"
          value={values?.beneficiaryFirstName}
          onChange={handleChange}
          error={errors?.beneficiaryFirstName}
        />
        <Form.Input
          width={8}
          type="text"
          name={`beneficiaries[${index}].beneficiaryLastName`}
          label="Apellido"
          placeholder="Apellido"
          value={values?.beneficiaryLastName}
          onChange={handleChange}
          error={errors?.beneficiaryLastName}
        />
      </Form.Group>

      <Form.Input
        name={`beneficiaries[${index}].beneficiaryEmail`}
        type="text"
        label="Correo electrónico"
        placeholder="juanperez@example.com"
        value={values?.beneficiaryEmail}
        onChange={handleChange}
        error={errors?.beneficiaryEmail}
      />

      <Form.Group widths="equal">
        <Form.Input
          name={`beneficiaries[${index}].beneficiaryPhone`}
          type="text"
          label="Télefono"
          placeholder="Ej.: 8095555555"
          value={values?.beneficiaryPhone}
          onChange={handleChange}
          error={errors?.beneficiaryPhone}
        />
        <Form.Input
          name={`beneficiaries[${index}].beneficiaryMobile`}
          type="text"
          label="Celular"
          placeholder="Ej.: 8095555555"
          value={values?.beneficiaryMobile}
          onChange={handleChange}
          error={errors?.beneficiaryMobile}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Select
          name={`beneficiaries[${index}].beneficiaryRelationship`}
          label="Relación"
          options={map(beneficiaryRelationshipOptions, (relation) => ({
            text: `${relation.text}`,
            value: relation.value,
          }))}
          onChange={handleBeneficiaryRelationshipSelect}
          value={values.beneficiaryRelationship}
        />
        <Form.Input
          type="date"
          name={`beneficiaries[${index}].beneficiaryBirthDate`}
          label="Fecha de nacimiento"
          value={values?.beneficiaryBirthDate}
          onChange={handleChange}
          error={errors?.beneficiaryBirthDate}
        />
      </Form.Group>

      <TextArea
        label="Nota adicional"
        name={`beneficiaries[${index}].beneficiaryNote`}
        placeholder="Añade una nota (opcional)"
        rows={3}
        value={values.beneficiaryNote}
        onChange={handleChange}
      />
    </div>
  );
}
