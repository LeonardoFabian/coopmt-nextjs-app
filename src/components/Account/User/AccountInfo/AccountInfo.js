import styles from "./AccountInfo.module.scss";
import { useAuth } from "@/hooks";
import { fn } from "@/utils";
import { Block } from "@/components/Block";
import { Membership } from "@/api";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Shared } from "@/components/Shared";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./AccountInfo.form";
import { useFormik } from "formik";
import { User } from "@/api";

const userController = new User();
const membershipController = new Membership();

export function AccountInfo() {
  const { user } = useAuth();
  const [memberInformation, setMemberInformation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const membershipInformationResponse =
            await membershipController.check(user?.username);
          // console.log(
          //   "membershipInformationResponse: ",
          //   membershipInformationResponse
          // );
          setMemberInformation(membershipInformationResponse);
        } catch (error) {
          console.log("Error getting user membership information: ", error);
        }
      })();
    }
  }, []);

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  var userInitials = "";
  if (user) {
    const userNameInitial = fn.getStringInitials(user?.firstName);
    const userLastNameInitial = fn.getStringInitials(user?.lastName);

    userInitials = `${userNameInitial}${userLastNameInitial}`;
  }

  var userFormattedName = "";
  if (user) {
    userFormattedName = `${user.firstName} ${user.lastName}`;
  }

  const formik = useFormik({
    initialValues: initialValues(user.firstName, user.lastName),
    validationSchema: validationSchema(),
    updateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await userController.updateMe(user.id, formValues);
        // console.log("FORMULARIO ENVIADO");
        // console.log(formValues);
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    },
  });

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <div className={styles.avatar}>
                <span className={styles.initialsAvatar}>{userInitials}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{userFormattedName}</span>

                <span className={styles.documentId}>
                  Cédula de Identidad: <span>{user?.username || "--"}</span>
                </span>

                <span className={styles.memberId}>
                  No. Socio: <span>{user?.memberId || "--"}</span>
                </span>

                <span
                  className={classNames(styles.status, {
                    [styles.active]: memberInformation?.status === "ACTIVO",
                  })}
                >
                  Estatus: <span>{memberInformation?.status || "--"}</span>
                </span>
              </div>
            </div>
            <button className="edit_button" onClick={handleShowModal}>
              <span>Editar</span>
              <Block.MaterialIcon icon="edit" height="16px" />
            </button>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={handleShowModal}
        title="Editar"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="firstName"
              label="Nombre"
              placeholder="Nombre"
              value={formik?.values?.firstName}
              onChange={formik.handleChange}
              error={formik?.errors?.firstName}
            />
            <Form.Input
              type="text"
              name="lastName"
              label="Apellido"
              placeholder="Apellido"
              value={formik?.values?.lastName}
              onChange={formik.handleChange}
              error={formik?.errors?.lastName}
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
