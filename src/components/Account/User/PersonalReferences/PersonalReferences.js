import styles from "./PersonalReferences.module.scss";
import { Block } from "@/components/Block";
import {
  PersonalReferences as PersonalReferencesApi,
  RelationshipTypes,
} from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { Shared } from "@/components/Shared";
import { useRouter } from "next/router";
import { PersonalReference } from "./PersonalReference";

import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./PersonalReference/PersonalReference.form";
import { map } from "lodash";

const personalReferencesController = new PersonalReferencesApi();
const relationshipTypesController = new RelationshipTypes();

export function PersonalReferences() {
  const { user } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [reload, setReload] = useState(false);
  const [personalReferences, setPersonalReferences] = useState({});
  const [relationshipTypes, setRelationshipTypes] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const personalReferencesResponse =
            await personalReferencesController.getAll(user.id);
          // console.log(
          //   "personalReferencesResponse: ",
          //   personalReferencesResponse
          // );
          setPersonalReferences(personalReferencesResponse);
        } catch (error) {
          console.error("Error loading personal references: ", error);
        }
      })();
    }
  }, [reload]);

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
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      // console.log("userID: ", user.id);
      // console.log(formValues);
      try {
        await personalReferencesController.create(user.id, formValues);
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onReload = () => setReload((prevState) => !prevState);

  const handleShowModal = () => setShowModal((prevState) => !prevState);
  const onClose = () => setShowModal((prevState) => !prevState);

  const handleRelationshipSelect = (e, { name, value }) => {
    console.log("name: ", name, "value: ", value);
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h6 className={styles.title}>Listado de referencias personales</h6>
            <button className="add_button" onClick={handleShowModal}>
              <span>Añadir</span>
              <Block.MaterialIcon icon="add" height="16px" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              {personalReferences?.data ? (
                <div className={styles.references}>
                  {personalReferences.data.map((reference) => {
                    return (
                      <PersonalReference
                        key={reference.id}
                        reference={reference}
                        onReload={onReload}
                      />
                    );
                  })}
                </div>
              ) : (
                <Shared.NoResult text="No tienes referencias personales registradas." />
              )}
            </div>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Añadir referencia personal"
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
              placeholder="Ingrese el departamento"
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
    </>
  );
}
