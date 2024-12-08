import styles from "./Contact.module.scss";
import { Block } from "@/components/Block";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Phone } from "@/api";
import { ContactItem } from "./ContactItem";
import { Shared } from "@/components/Shared";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./ContactItem/ContactItem.form";
import { Form } from "semantic-ui-react";

const phoneController = new Phone();

export function Contact() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [phones, setPhones] = useState({});
  const [reload, setReload] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const phonesResponse = await phoneController.getAll(user.id);
          console.log("USER PHONES: ", phonesResponse);
          setPhones(phonesResponse);
        } catch (error) {
          console.log("Error loading phones: ", error);
        }
      })();
    }
  }, [reload, user]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await phoneController.create(user.id, formValues);
        formik.handleReset();
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

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h6 className={styles.title}>Números de contacto</h6>
            <button className="add_button" onClick={handleShowModal}>
              <span>Añadir</span>
              <Block.MaterialIcon icon="add" height="16px" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              {phones?.data ? (
                <div className={styles.phones}>
                  {phones.data.map((phone) => {
                    console.log("PHONE: ", phone);
                    return (
                      <ContactItem
                        key={phone.id}
                        phone={phone}
                        onReload={onReload}
                        reload={reload}
                        updateUser={updateUser}
                      />
                    );
                  })}
                  <div className={styles.notes}>
                    {/* <p>NOTA</p> */}
                    <ul>
                      <li>
                        Cuando estableces un número de contacto como
                        predeterminado, se utilizará dicha información durante
                        el envío de formularios.
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Shared.NoResult text="No tienes números de contacto registrados." />
              )}
            </div>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Añadir número de contacto"
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
    </>
  );
}
