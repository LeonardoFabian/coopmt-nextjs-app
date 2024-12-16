import styles from "./PersonalInformation.module.scss";
import { useAuth } from "@/hooks";
import { Block } from "@/components/Block";
import { useState, useEffect } from "react";
import { Shared } from "@/components/Shared";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./PersonalInformation.form";
import { useFormik } from "formik";
import { User, Gender, MaritalStatus } from "@/api";
import { map } from "lodash";

const userController = new User();
const genderController = new Gender();
const maritalStatusController = new MaritalStatus();

const hasChildrenOptions = [
  { text: "SI", value: true },
  { text: "NO", value: false },
];

export function PersonalInformation({ reload, onReload }) {
  const { user } = useAuth();
  // console.log("USER: ", user);
  const [showModal, setShowModal] = useState(false);
  const [userHasChildren, setUserHasChildren] = useState(user.hasChildren);
  const [showChildrensInput, setShowChildrensInput] = useState(
    user.hasChildren
  );
  const [genders, setGenders] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);

  if (!user) {
    return null;
  }

  const handleUserHasChildren = (e, { name, value }) => {
    formik.setFieldValue(name, value);
    setUserHasChildren(value === true);
  };

  useEffect(() => {
    (async () => {
      try {
        const gendersResponse = await genderController.getAll();
        // console.log("Genders: ", gendersResponse);
        setGenders(gendersResponse);

        const maritalStatusResponse = await maritalStatusController.find();
        // console.log("maritalStatusResponse: ", maritalStatusResponse);
        setMaritalStatus(maritalStatusResponse);
      } catch (error) {
        console.error("Error fetching genders: ", error);
      }
    })();
  }, [reload]);

  useEffect(() => {
    setShowChildrensInput((prevState) => !prevState);
  }, [userHasChildren]);

  const formik = useFormik({
    initialValues: initialValues(
      user.firstName,
      user.lastName,
      user.nickname,
      user.email,
      user?.gender?.id,
      user.birthdate,
      user?.maritalStatus?.id,
      user.hasChildren,
      user.childrens
    ),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      let conditionalFormValues = {
        ...formValues,
        childrens:
          formValues.hasChildren === true
            ? formValues.childrens > 0
              ? formValues.childrens
              : null
            : 0,
      };
      try {
        await userController.updateMe(user.id, conditionalFormValues);
        // console.log(conditionalFormValues);
        onReload();
        onClose();
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    },
  });

  // const onReload = () => setReload((prevState) => !prevState);
  const onClose = () => setShowModal((prevState) => !prevState);
  const handleShowModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h6 className={styles.title}>Información Personal</h6>
            <button className="edit_button" onClick={handleShowModal}>
              Editar
              <Block.MaterialIcon icon="edit" height="16px" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <div>
                <label>Nombre</label>
                <span>{user?.firstName || "--"}</span>
              </div>
              <div>
                <label>Apellido</label>
                <span>{user?.lastName || "--"}</span>
              </div>
              <div>
                <label>Apodo</label>
                <span>{user?.nickname || "--"}</span>
              </div>
              <div>
                <label>Correo electrónico</label>
                <span>{user?.email || "--"}</span>
              </div>
              <div>
                <label>Género</label>
                <span>{user?.gender?.name || "--"}</span>
              </div>
              <div>
                <label>Fecha de Nacimiento</label>
                <span>{user?.birthdate || "--"}</span>
              </div>
              <div>
                <label>Estado Civil</label>
                <span>{user?.maritalStatus?.label || "--"}</span>
              </div>
              <div>
                <label>Hijos dependientes</label>
                <span>{user?.childrens || "--"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Información Personal"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Group widths={"equal"}>
            <Form.Input
              fluid
              label="Nombre"
              name="firstName"
              value={formik?.values?.firstName}
              onChange={formik.handleChange}
              error={formik?.errors?.firstName}
            />
            <Form.Input
              fluid
              label="Apellido"
              name="lastName"
              value={formik?.values?.lastName}
              onChange={formik.handleChange}
              error={formik?.errors?.lastName}
            />
          </Form.Group>

          <Form.Group widths={"equal"}>
            <Form.Input
              fluid
              label="Apodo"
              name="nickname"
              value={formik?.values?.nickname}
              onChange={formik.handleChange}
              error={formik?.errors?.nickname}
            />
            <Form.Input
              name="birthdate"
              type="date"
              label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              error={formik.errors.birthdate}
            />
          </Form.Group>

          <Form.Input
            fluid
            label="Correo electrónico"
            name="email"
            value={formik?.values?.email}
            onChange={formik.handleChange}
            error={formik?.errors?.email}
          />

          <Form.Group widths="equal">
            <Form.Select
              name="gender"
              label="Género"
              options={[
                { text: "Selecciona tu género", value: 0 },
                ...map(genders?.data, (gender) => ({
                  text: `${gender.attributes.name}`,
                  value: gender.id,
                })),
              ]}
              onChange={(e, { name, value }) =>
                formik.setFieldValue(name, value)
              }
              value={formik.values.gender}
              error={formik.errors.gender}
            />
            <Form.Select
              name="maritalStatus"
              label="Estado Civil"
              options={[
                { text: "Selecciona tu estado civil", value: 0 },
                ...map(maritalStatus?.data, (maritalStatus) => ({
                  text: `${maritalStatus.attributes.label}`,
                  value: maritalStatus.id,
                })),
              ]}
              onChange={(e, { name, value }) =>
                formik.setFieldValue(name, value)
              }
              value={formik.values.maritalStatus}
              error={formik.errors.maritalStatus}
            />
          </Form.Group>

          <Form.Group widths={"equal"}>
            <Form.Select
              name="hasChildren"
              label="Tienes hijos?"
              placeholder="Selecciona"
              options={[
                { text: "Selecciona", value: "" },
                ...hasChildrenOptions,
              ]}
              onChange={handleUserHasChildren}
              value={formik.values.hasChildren}
              error={formik.errors.hasChildren}
            />

            <Form.Input
              name="childrens"
              type="number"
              label="Cuantos hijos dependientes tiene?"
              placeholder="Hijos dependientes"
              disabled={userHasChildren !== true}
              value={formik.values.childrens}
              onChange={formik.handleChange}
              error={formik.errors.childrens}
            />
          </Form.Group>

          <div className={styles.actions}>
            <Form.Button type="submit" loading={formik.isSubmitting}>
              Guardar
              <Block.MaterialIcon icon="save" height="16px" />
            </Form.Button>
          </div>
        </Form>
      </Shared.AppModal>
    </>
  );
}
