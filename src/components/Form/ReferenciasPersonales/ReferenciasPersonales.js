import styles from "./ReferenciasPersonales.module.scss";
import { FieldRenderer } from "../FieldRenderer";
import { map, set } from "lodash";
import { Button, Form, Icon } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { Shared } from "@/components/Shared";
import { useEffect, useState } from "react";
import { RelationshipTypes } from "@/api";
import { Block } from "@/components/Block";
import { FieldArray } from "formik";
import { ref } from "yup";

const relationshipTypesController = new RelationshipTypes();

export function ReferenciasPersonales(props) {
  const { user } = useAuth();
  console.log("Referencias Personales user: ", user);
  const { component, values } = props;
  console.log("Referencias Personales: ", props);

  const data = component?.data;
  const [relationshipTypes, setRelationshipTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReferences, setSelectedReferences] = useState([]);

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

  const handleShowModal = () => setShowModal((prevState) => !prevState);
  const onClose = () => setShowModal((prevState) => !prevState);

  const handleAddReference = (reference, arrayHelpers) => {
    arrayHelpers.push({
      Cedula: reference.documentId || "",
      Nombres: reference.firstName || "",
      Apellidos: reference.lastName || "",
      Apodo: reference.nickname || "",
      Correo: reference.email || "",
      Telefono: reference.phone || "",
      Celular: reference.mobile || "",
      Relacion: 0,
      Direccion1: reference.address || "",
      Direccion2: reference.address2 || "",
      Ciudad: reference.city || "",
      Provincia: reference.state || "",
      Pais: reference.country || "",
    });
    setSelectedReferences((prev) => [...prev, reference]);
  };

  const handleRemoveReference = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
    setSelectedReferences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleReference = (reference, refIndex, arrayHelpers) => {
    const isSelected =
      selectedReferences.findIndex(
        (r) => r.documentId === reference.documentId
      ) !== -1;

    if (isSelected) {
      const indexToRemove = selectedReferences.findIndex(
        (r) => r.documentId === reference.documentId
      );
      arrayHelpers.remove(indexToRemove);
      setSelectedReferences((prev) =>
        prev.filter((_, i) => i !== indexToRemove)
      );
    } else {
      handleAddReference(reference, arrayHelpers);
    }
  };

  return (
    <FieldArray
      name="ReferenciasPersonales"
      render={(arrayHelpers) => (
        <>
          <section className={styles.referenciasPersonales}>
            <div className="header">
              <h5>Referencias Personales</h5>
              <button
                type="button"
                className="add_button"
                onClick={handleShowModal}
              >
                Seleccionar
                <Block.MaterialIcon icon="add" height="16px" />
              </button>
            </div>

            <div className={styles.referenciasPersonalesContainer}>
              {selectedReferences.map((reference, refIndex) => (
                <div
                  key={reference.documentId || refIndex}
                  id={reference.documentId || refIndex}
                  className={styles.referenceGroup}
                >
                  <div className="options">
                    <h6>
                      Referencia:{" "}
                      {reference?.firstName + " " + reference?.lastName}
                    </h6>
                    <button
                      type="button"
                      className="delete_button"
                      onClick={() =>
                        handleRemoveReference(refIndex, arrayHelpers)
                      }
                    >
                      Remover
                      <Block.MaterialIcon icon="close" height="16px" />
                    </button>
                  </div>
                  <div className="fields">
                    {map(data.attributes, (field, index) => {
                      let value = reference[field.name] || values[field.name];
                      let options = [];

                      {
                        switch (field.name) {
                          case "Relacion":
                            options =
                              relationshipTypes && relationshipTypes?.data
                                ? [
                                    { text: "Selecciona una opción", value: 0 },
                                    ...relationshipTypes?.data?.map(
                                      (relationshipType) => ({
                                        text: relationshipType?.attributes
                                          ?.label,
                                        value: relationshipType?.id,
                                      })
                                    ),
                                  ]
                                : [];
                            {
                              /* case "Cedula":
                            value = reference?.documentId;
                            break;
                          case "Nombres":
                            value = reference?.firstName;
                            break;
                          case "Apellidos":
                            value = reference?.lastName;
                            break;
                          case "Apodo":
                            value = reference?.nickname;
                            break;
                          case "Telefono":
                            value = reference?.telefono;
                            break;
                          case "Correo":
                            value = reference?.email;
                            break;
                          case "Telefono":
                            value = reference?.phone;
                            break;
                          case "Celular":
                            value = reference?.mobile;
                            break;
                          case "Direccion1":
                            value = reference?.address;
                            break;
                          case "Direccion2":
                            value = reference?.address2;
                            break;
                          case "Ciudad":
                            value = reference?.city;
                            break;
                          case "Provincia":
                            value = reference?.state;
                            break;
                          case "Pais":
                            value = reference?.country;
                            break;
                          default:
                            value = values[field.name];
                            break; */
                            }
                        }
                      }

                      return (
                        <FieldRenderer
                          key={index}
                          field={{ ...field, options }}
                          name={`ReferenciasPersonales[${refIndex + 1}].${
                            field.name
                          }`}
                          // value={value}
                          // {...props}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Shared.AppModal
            show={showModal}
            onClose={onClose}
            title="Seleccionar Referencias Personales"
          >
            {user?.personal_references?.length > 0 ? (
              <ul className={styles.referencesList}>
                {user.personal_references.map((reference, refIndex) => (
                  <li key={refIndex} className={styles.reference}>
                    {reference.firstName} {reference.lastName}
                    <button
                      type="button"
                      className={
                        selectedReferences.findIndex((r) => r === reference) ===
                        -1
                          ? "add_button"
                          : "delete_button"
                      }
                      onClick={() =>
                        handleToggleReference(reference, refIndex, arrayHelpers)
                      }
                    >
                      {selectedReferences.findIndex((r) => r === reference) ===
                      -1
                        ? "Añadir"
                        : "Remover"}

                      {selectedReferences.findIndex((r) => r === reference) ===
                      -1 ? (
                        <Block.MaterialIcon icon="add" height="16px" />
                      ) : (
                        <Block.MaterialIcon icon="close" height="16px" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Shared.NoResult text="No tienes referencias personales registradas en tu perfil" />
            )}
          </Shared.AppModal>
        </>
      )}
    />
  );
}
