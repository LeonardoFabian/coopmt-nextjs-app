import styles from "./Beneficiaries.module.scss";
import { Beneficiary } from "./Beneficiary";
import { useAuth } from "@/hooks";
import { Beneficiary as BeneficiaryApi, RelationshipTypes } from "@/api";
import { useEffect, useState } from "react";
import { Block } from "@/components/Block";
import { useRouter } from "next/router";
import { Shared } from "@/components/Shared";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./Beneficiary/Beneficiary.form";
import { map } from "lodash";

const beneficiaryController = new BeneficiaryApi();
const relationshipTypesController = new RelationshipTypes();

export function Beneficiaries() {
  const { user } = useAuth();
  const router = useRouter();
  const [beneficiaries, setBeneficiaries] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [reload, setReload] = useState(false);
  const [relationshipTypes, setRelationshipTypes] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const beneficiariesResponse = await beneficiaryController.getAll(
            user.id
          );
          // console.log("USER BENEFICIARIES: ", beneficiariesResponse);
          setBeneficiaries(beneficiariesResponse);
        } catch (error) {
          console.error("Error getting beneficiaries: ", error);
        }
      })();
    }
  }, [reload]);

  useEffect(() => {
    (async () => {
      try {
        const relationshipTypesResponse =
          await relationshipTypesController.getAll();
        // console.log("relationshipTypesResponse: ", relationshipTypesResponse);
        setRelationshipTypes(relationshipTypesResponse);
      } catch (error) {
        console.error("Error getting relationship types: ", error);
      }
    })();
  }, [showModal]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      // console.log("formValues: ", formValues);
      try {
        await beneficiaryController.create(user.id, formValues);

        onReload();
        onClose();
      } catch (error) {
        console.error("Error creating beneficiary: ", error);
      }
    },
  });

  const onReload = () => setReload((prevState) => !prevState);

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  const onClose = () => setShowModal((prevState) => !prevState);

  const handleRelationshipSelect = (e, { name, value }) => {
    // console.log("name: ", name, "value: ", value);
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h6 className={styles.title}>Listado de beneficiarios</h6>
            <button className="add_button" onClick={handleShowModal}>
              <span>Añadir</span>
              <Block.MaterialIcon icon="add" height="16px" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              {beneficiaries?.data ? (
                <div className={styles.beneficiaries}>
                  {beneficiaries.data.map((beneficiary) => {
                    return (
                      <Beneficiary
                        key={beneficiary.id}
                        beneficiary={beneficiary}
                        onReload={onReload}
                      />
                    );
                  })}
                </div>
              ) : (
                <Shared.NoResult text="No tienes beneficiarios registrados." />
              )}
            </div>
          </div>
        </div>
      </div>

      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Editar Beneficiario"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="documentID"
              label="Cédula de identidad"
              placeholder="Ejemplo: 00123456789"
              onChange={formik.handleChange}
              value={formik?.values?.documentID}
              error={formik?.errors?.documentID}
            />
            <Form.Input
              type="text"
              name="firstname"
              label="Nombre"
              placeholder="Ejemplo: Juan"
              onChange={formik.handleChange}
              value={formik?.values?.firstname}
              error={formik?.errors?.firstname}
            />
            <Form.Input
              type="text"
              name="lastname"
              label="Apellido"
              placeholder="Ejemplo: Perez"
              onChange={formik.handleChange}
              value={formik?.values?.lastname}
              error={formik?.errors?.lastname}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              type="date"
              name="birthDate"
              label="Fecha de nacimiento"
              onChange={formik.handleChange}
              value={formik?.values?.birthDate}
              error={formik?.errors?.birthDate}
            />
            <Form.Select
              name="relationship_type"
              label="Tipo de relacion"
              placeholder="Tipo de relacion"
              options={map(relationshipTypes?.data, (relationship) => ({
                text: `${relationship?.attributes?.label}`,
                value: relationship?.id,
              }))}
              onChange={handleRelationshipSelect}
              value={formik?.values?.relationship_type}
              error={formik?.errors?.relationship_type}
            />
          </Form.Group>
          <Form.Input
            type="text"
            name="email"
            label="Correo electrónico"
            placeholder="Ejemplo: juanperez@email.com"
            onChange={formik.handleChange}
            value={formik?.values?.email}
            error={formik?.errors?.email}
          />
          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="phone"
              label="Teléfono"
              placeholder="Ejemplo: 8095555555"
              onChange={formik.handleChange}
              value={formik?.values?.phone}
              error={formik?.errors?.phone}
            />
            <Form.Input
              type="text"
              name="mobile"
              label="Celular"
              placeholder="Ejemplo: 8295555555"
              onChange={formik.handleChange}
              value={formik?.values?.mobile}
              error={formik?.errors?.mobile}
            />
          </Form.Group>
          <Form.TextArea
            name="note"
            label="Nota (opcional)"
            placeholder="Añade una nota sobre este beneficiario"
            onChange={formik.handleChange}
            value={formik?.values?.note}
            error={formik?.errors?.note}
          />

          <div className={styles.actions}>
            <Form.Button type="submit" loading={formik.isSubmitting}>
              Guardar
            </Form.Button>
          </div>
        </Form>
      </Shared.AppModal>
    </>
  );
}
