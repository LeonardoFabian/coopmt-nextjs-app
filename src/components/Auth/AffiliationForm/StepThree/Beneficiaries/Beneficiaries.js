import styles from "./Beneficiaries.module.scss";
import { Button, Icon } from "semantic-ui-react";
import { FieldArray } from "formik";
import { BeneficiaryForm } from "./BeneficiaryForm";
import { Shared } from "@/components/Shared";

export function Beneficiaries({
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
    <FieldArray
      name="beneficiaries"
      render={(arrayHelpers) => (
        <div className={styles.beneficiaries}>
          <h5>Beneficiarios</h5>
          <Shared.Alert
            className="info"
            text="Utiliza los botones AÑADIR o REMOVER para agregar o eliminar un beneficiario de tu lista."
          />
          <Shared.Separator height={30} />
          {values.beneficiaries.map((beneficiary, index) => (
            <div key={index} className={styles.beneficiary}>
              <BeneficiaryForm
                index={index}
                values={beneficiary}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.beneficiaries && errors.beneficiaries[index]}
                touched={touched.beneficiaries && touched.beneficiaries[index]}
                setFieldValue={setFieldValue}
              />
              <Button
                type="button"
                className={styles.removeBtn}
                onClick={() => arrayHelpers.remove(index)}
              >
                <Icon name="user times" /> Remover
              </Button>
            </div>
          ))}
          <Button
            type="button"
            className={styles.addBtn}
            onClick={() =>
              arrayHelpers.push({
                beneficiaryDocumentId: "",
                beneficiaryFirstName: "",
                beneficiaryLastName: "",
                beneficiaryPhone: "",
                beneficiaryMobile: "",
                beneficiaryEmail: "",
                beneficiaryRelationship: "",
                beneficiaryNote: "",
                beneficiaryBirthDate: "",
              })
            }
          >
            <Icon name="user plus" /> Añadir
          </Button>
        </div>
      )}
    />
  );
}
