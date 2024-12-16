import styles from "./PersonalReference.module.scss";
import { fn } from "@/utils";
import { useEffect, useState } from "react";
import { PersonalReferences, RelationshipTypes } from "@/api";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { Block } from "@/components/Block";
import { Shared } from "@/components/Shared";
import { initialValues, validationSchema } from "./PersonalReference.form";
import { map } from "lodash";

const personalReferencesController = new PersonalReferences();
const relationshipTypesController = new RelationshipTypes();

export function PersonalReference(props) {
  const { reference, onReload } = props;
  // console.log("PersonalReference reference: ", reference);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [relationshipTypes, setRelationshipTypes] = useState([]);

  const firstName = reference?.attributes?.firstName;
  const lastName = reference?.attributes?.lastName;
  const phone = reference?.attributes?.phone;
  const mobile = reference?.attributes?.mobile;
  const nickname = reference?.attributes?.nickname;
  const documentId = reference?.attributes?.documentId;
  const email = reference?.attributes?.email;
  const address = reference?.attributes?.address;
  const address2 = reference?.attributes?.address2;
  const city = reference?.attributes?.city;
  const state = reference?.attributes?.state;
  const country = reference?.attributes?.country;
  const relationship_type = reference?.attributes?.relationship_type?.data;

  var userInitials = "";
  const userNameInitial = fn.getStringInitials(firstName);
  const userLastNameInitial = fn.getStringInitials(lastName);
  userInitials = `${userNameInitial}${userLastNameInitial}`;

  const formattedName = `${firstName} ${lastName}`;
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
      firstName,
      lastName,
      phone,
      mobile,
      nickname,
      documentId,
      email,
      address,
      address2,
      city,
      state,
      country,
      relationship_type.id
    ),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log(formValues);
      try {
        if (reference.id) {
          await personalReferencesController.update(
            reference.id,
            user.id,
            formValues
          );
        } else {
          await personalReferencesController.create(user.id, formValues);
        }
        onReload();
        onClose();
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
      await personalReferencesController.delete(reference.id);
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
            {reference && (
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
        title="Editar información"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Group widths={"equal"}>
            <Form.Input
              type="text"
              name="firstName"
              label="Nombre"
              placeholder="Ingrese el nombre"
              onChange={formik.handleChange}
              value={formik?.values?.firstName}
              error={formik?.errors?.firstName}
            />
            <Form.Input
              type="text"
              name="lastName"
              label="Apellidos"
              placeholder="Ingrese el apellido"
              onChange={formik.handleChange}
              value={formik?.values?.lastName}
              error={formik?.errors?.lastName}
            />
            <Form.Input
              type="text"
              name="nickname"
              label="Apodo (opcional)"
              placeholder="Nombre con que se le conoce"
              onChange={formik.handleChange}
              value={formik?.values?.nickname}
              error={formik?.errors?.nickname}
            />
          </Form.Group>

          <Form.Group widths={"equal"}>
            <Form.Input
              type="text"
              name="documentId"
              label="Cédula (opcional)"
              placeholder="Ejemplo: 00112345678"
              onChange={formik.handleChange}
              value={formik?.values?.documentId}
              error={formik?.errors?.documentId}
            />

            <Form.Input
              type="text"
              name="phone"
              label="Teléfono"
              placeholder="Ingrese el telefono"
              onChange={formik.handleChange}
              value={formik?.values?.phone}
              error={formik?.errors?.phone}
            />
            <Form.Input
              type="text"
              name="mobile"
              label="Celular"
              placeholder="Ingrese el celular"
              onChange={formik.handleChange}
              value={formik?.values?.mobile}
              error={formik?.errors?.mobile}
            />
          </Form.Group>

          <Form.Group widths={"equal"}>
            <Form.Input
              type="text"
              name="email"
              label="Correo electrónico"
              placeholder="juanperez@example.com"
              onChange={formik.handleChange}
              value={formik?.values?.email}
              error={formik?.errors?.email}
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
          <Form.Group widths={"equal"}>
            <Form.Input
              type="text"
              name="address"
              label="Dirección"
              placeholder="Ingrese la direccion"
              onChange={formik.handleChange}
              value={formik?.values?.address}
              error={formik?.errors?.address}
            />
            <Form.Input
              type="text"
              name="address2"
              label="Dirección 2 (opcional)"
              placeholder="Ejemplo: Sector, Edificio, Oficina"
              onChange={formik.handleChange}
              value={formik?.values?.address2}
              error={formik?.errors?.address2}
            />
          </Form.Group>

          <Form.Group widths={"equal"}>
            <Form.Input
              type="text"
              name="city"
              label="Ciudad"
              placeholder="Ingrese la ciudad"
              onChange={formik.handleChange}
              value={formik?.values?.city}
              error={formik?.errors?.city}
            />
            <Form.Input
              type="text"
              name="state"
              label="Estado/Provincia"
              placeholder="Ingrese el estado o provincia"
              onChange={formik.handleChange}
              value={formik?.values?.state}
              error={formik?.errors?.state}
            />
            <Form.Input
              type="text"
              name="country"
              label="Pais"
              placeholder="Ingrese el pais"
              onChange={formik.handleChange}
              value={formik?.values?.country}
              error={formik?.errors?.country}
            />
          </Form.Group>

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
        content="¿Quieres eliminar esta referencia personal?"
      />
    </>
  );
}
