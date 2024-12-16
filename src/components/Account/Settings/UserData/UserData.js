import styles from "./UserData.module.scss";
import { Form, Icon, Message, Select, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./UserData.form";
import { useAuth } from "@/hooks";
import { User } from "@/api";
import { useEffect, useState } from "react";

const userController = new User();

const genderOptions = [
  { text: "Masculino", value: "masculino" },
  { text: "Femenino", value: "femenino" },
  { text: "Otro", value: "otro" },
];

const maritalStatusOptions = [
  { text: "Casado", value: "casado" },
  { text: "Soltero", value: "soltero" },
  { text: "Unión libre", value: "union-libre" },
];

const hasChildrenOptions = [
  { text: "SI", value: true },
  { text: "NO", value: false },
];

export function UserData() {
  const { user } = useAuth();
  // console.log(user);

  const [userHasChildren, setUserHasChildren] = useState(user.hasChildren);
  const [showChildrensInput, setShowChildrensInput] = useState(
    user.hasChildren
  );

  const handleUserHasChildren = (e, { name, value }) => {
    formik.setFieldValue(name, value);
    setUserHasChildren(value === true);
  };

  useEffect(() => {
    setShowChildrensInput((prevState) => !prevState);
  }, [userHasChildren]);

  const formik = useFormik({
    initialValues: initialValues(
      user.documentId,
      user.birthdate,
      user.firstName,
      user.lastName,
      user.nickname,
      user.gender,
      user.maritalStatus,
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
        // console.log("FORMULARIO ENVIADO");
        // console.log(conditionalFormValues);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2>Datos Personales</h2>

      <Form.Group widths="equal">
        <Form.Input
          name="documentId"
          type="text"
          label="Cédula de identidad"
          placeholder="Cédula de identidad"
          value={formik.values.documentId}
          onChange={formik.handleChange}
          error={formik.errors.documentId}
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

      <Form.Group widths="equal">
        <Form.Input
          name="firstName"
          type="text"
          label="Nombre"
          placeholder="Nombre"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
        />
        <Form.Input
          name="lastName"
          type="text"
          label="Apellidos"
          placeholder="Apellidos"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName}
        />
        <Form.Input
          name="nickname"
          type="text"
          label="Apodo"
          placeholder="Apodo"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          error={formik.errors.nickname}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Select
          name="gender"
          label="Género"
          placeholder="Selecciona tu género"
          options={genderOptions}
          onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
          value={formik.values.gender}
          error={formik.errors.gender}
        />
        <Form.Select
          name="maritalStatus"
          label="Estado Civil"
          placeholder="Selecciona tu estado civil"
          options={maritalStatusOptions}
          onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
          value={formik.values.maritalStatus}
          error={formik.errors.maritalStatus}
        />
      </Form.Group>

      <Form.Group>
        <Form.Field>
          <Form.Select
            name="hasChildren"
            label="Tienes hijos?"
            placeholder="Selecciona"
            options={hasChildrenOptions}
            onChange={handleUserHasChildren}
            value={formik.values.hasChildren}
            error={formik.errors.hasChildren}
          />
        </Form.Field>
        {!showChildrensInput && (
          <Form.Input
            name="childrens"
            type="number"
            label="Cuantos hijos dependientes tiene?"
            placeholder="Hijos dependientes"
            value={formik.values.childrens}
            onChange={formik.handleChange}
            error={formik.errors.childrens}
          />
        )}
      </Form.Group>

      <div className={styles.actions}>
        <Form.Button type="submit" loading={formik.isSubmitting}>
          <Icon name="save" /> Enviar
        </Form.Button>
      </div>
    </Form>
  );
}
