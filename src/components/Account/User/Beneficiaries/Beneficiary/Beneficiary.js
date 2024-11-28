import styles from "./Beneficiary.module.scss";
import { fn } from "@/utils";
import { Block } from "@/components/Block";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./Beneficiary.form";
import { RelationshipTypes, Beneficiary as BeneficiaryApi } from "@/api";
import { Shared } from "@/components/Shared";
import { map } from "lodash";

const relationshipTypesController = new RelationshipTypes();
const beneficiaryController = new BeneficiaryApi();

export function Beneficiary(props) {
  const { beneficiary, onReload } = props;
  console.log("beneficiary: ", beneficiary);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [relationshipTypes, setRelationshipTypes] = useState([]);

  const documentID = beneficiary?.attributes?.documentID;
  const firstname = beneficiary?.attributes?.firstname;
  const lastname = beneficiary?.attributes?.lastname;
  const email = beneficiary?.attributes?.email;
  const birthDate = beneficiary?.attributes?.birthDate;
  const note = beneficiary?.attributes?.note;
  const phone = beneficiary?.attributes?.phone;
  const mobile = beneficiary?.attributes?.mobile;
  const relationship_type = beneficiary?.attributes?.relationship_type?.data;

  var userInitials = "";
  const userNameInitial = fn.getStringInitials(firstname);
  const userLastNameInitial = fn.getStringInitials(lastname);
  userInitials = `${userNameInitial}${userLastNameInitial}`;

  const formattedName = `${firstname} ${lastname}`;
  const relationshipLabel = relationship_type?.attributes?.label;

  useEffect(() => {
    (async () => {
      try {
        const relationshipTypesResponse =
          await relationshipTypesController.getAll();
        console.log("relationshipTypesResponse: ", relationshipTypesResponse);
        setRelationshipTypes(relationshipTypesResponse);
      } catch (error) {
        console.error("Error getting relationship types: ", error);
      }
    })();
  }, [showModal]);

  const formik = useFormik({
    initialValues: initialValues(
      documentID,
      firstname,
      lastname,
      email,
      birthDate,
      note,
      phone,
      mobile,
      relationship_type.id
    ),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log("formValues: ", formValues);
      try {
        if (beneficiary.id) {
          await beneficiaryController.update(
            beneficiary.id,
            user.id,
            formValues
          );
        } else {
          await beneficiaryController.create(user.id, formValues);
        }
        onReload();
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onClose = () => {
    setShowModal(false);
  };
  const handleShowModal = () => setShowModal((prevState) => !prevState);
  const handleShowConfirm = () => setShowConfirm((prevState) => !prevState);

  const deleteOnConfirm = async () => {
    try {
      await beneficiaryController.delete(beneficiary.id);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRelationshipSelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {beneficiary && (
              <div className={styles.contentWrapper}>
                <div className={styles.mainContent}>
                  <div className={styles.avatar}>
                    <span className={styles.initialsAvatar}>
                      {userInitials}
                    </span>
                  </div>
                  <div className={styles.info}>
                    <p className={styles.name}>{formattedName}</p>
                    <span className={styles.relationship}>
                      {relationshipLabel}
                    </span>
                  </div>
                </div>

                <div className={styles.actions}>
                  {/* <button className="info_button" onClick={handleShowModal}>
                    <span>Mostrar</span>
                    <Block.MaterialIcon icon="open_in_new" height="16px" />
                  </button> */}
                  <button className="edit_button" onClick={handleShowModal}>
                    <span>Editar</span>
                    <Block.MaterialIcon icon="edit" height="16px" />
                  </button>
                  <button className="delete_button" onClick={handleShowConfirm}>
                    <span>Eliminar</span>
                    <Block.MaterialIcon icon="delete" height="16px" />
                  </button>
                </div>
              </div>
            )}
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

      <Shared.Confirm
        open={showConfirm}
        onConfirm={deleteOnConfirm}
        onCancel={handleShowConfirm}
        content="¿Deseas eliminar este beneficiario?"
      />
    </>
  );
}
