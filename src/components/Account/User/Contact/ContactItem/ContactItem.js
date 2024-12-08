import styles from "./ContactItem.module.scss";
import { Block } from "@/components/Block";
import { Shared } from "@/components/Shared";
import { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ContactItem.form";
import { useAuth } from "@/hooks";
import { Phone, User } from "@/api";

const phoneController = new Phone();
const userController = new User();

export function ContactItem(props) {
  const { phone, onReload, updateUser, reload } = props;
  console.log("phone: ", phone);
  // const { user } = useAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getMe();
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [reload]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const label = phone?.attributes?.label || "";
  const number = phone?.attributes?.number || "";
  const ext = phone?.attributes?.ext || "";

  const formattedContact = `${number} ${ext ? `Ext. ${ext}` : ""}`;

  const formik = useFormik({
    initialValues: initialValues(label, number, ext),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (phone.id) {
          await phoneController.update(phone.id, formValues);
        } else {
          await phoneController.create(user.id, formValues);
        }
        onReload();
        onClose();
      } catch (error) {
        console.log("Error updating phone: ", error);
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
      await phoneController.delete(phone.id);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  const setDefaultContactPhone = async (phoneId) => {
    try {
      await userController.updateMe(user.id, {
        defaultPhone: phoneId,
      });
      updateUser("defaultPhone", phoneId);
      onReload();
    } catch (error) {
      console.error("Error setting default contact phone: ", error);
    }
  };

  const showButton = user?.defaultPhone?.id !== phone?.id ? true : false;
  console.log("Show BTN: ", showButton);

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {phone && (
              <div className={styles.contentWrapper}>
                <div className={styles.header}>
                  <h6 className={styles.title}>{label}</h6>
                  {user?.defaultPhone?.id == phone?.id ? (
                    <span>
                      Número de contacto principal{" "}
                      <Block.MaterialIcon icon="star" height="13px" />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <span className={styles.number}>{formattedContact}</span>
                <div className={styles.actions}>
                  <button className="edit_button" onClick={handleShowModal}>
                    <span>Editar</span>
                    <Block.MaterialIcon icon="edit" height="16px" />
                  </button>
                  <button className="delete_button" onClick={handleShowConfirm}>
                    <span>Eliminar</span>
                    <Block.MaterialIcon icon="delete" height="16px" />
                  </button>
                  {showButton && (
                    <button
                      className="default_button"
                      onClick={() => setDefaultContactPhone(phone.id)}
                    >
                      Establecer como predeterminada
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Editar Contacto"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="label"
              label="Etiqueta"
              placeholder="Ejemplo: Casa, Trabajo, etc."
              onChange={formik.handleChange}
              value={formik?.values?.label}
              error={formik?.errors?.label}
            />
            <Form.Input
              name="number"
              label="Número"
              placeholder="Ejemplo: 8095555555"
              onChange={formik.handleChange}
              value={formik?.values?.number}
              error={formik?.errors?.number}
            />
          </Form.Group>
          <Form.Input
            type="text"
            name="ext"
            placeholder="Ejemplo: 3000, 3001, etc."
            label="Extensiones (opcional)"
            onChange={formik.handleChange}
            value={formik?.values?.ext}
            error={formik?.errors?.ext}
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
        content="¿Quieres eliminar este contacto?"
      />
    </>
  );
}
