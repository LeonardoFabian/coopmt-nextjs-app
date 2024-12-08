import styles from "./EmploymentInformation.module.scss";
import { Block } from "@/components/Block";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EmploymentInformation as EmploymentCtrl, User } from "@/api";
import { EmploymentItem } from "./EmploymentItem";
import { Shared } from "@/components/Shared";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { validationSchema } from "./EmploymentItem/EmploymentItem.form";
import { map } from "lodash";
import { format } from "date-fns";

const employmentController = new EmploymentCtrl();
// const userController = new User();

// const sectorOptions = [
//   { text: "Público", value: "publico" },
//   { text: "Privado", value: "privado" },
// ];

const isCareerEmployeeOptions = [
  { text: "SI", value: true },
  { text: "NO", value: false },
];

export function EmploymentInformation() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [employments, setEmployments] = useState({});
  const [reload, setReload] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [employmentSectors, setEmploymentSectors] = useState({});
  const [employmentTypes, setEmploymentTypes] = useState({});

  // useEffect(() => {
  //   console.log("Reload");
  // }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const employmentsResponse =
            await employmentController.getEmploymentInformation(user?.id);
          // console.log("employmentsResponse: ", employmentsResponse);
          setEmployments(employmentsResponse);
        } catch (error) {
          console.error("Error loading employments: ", error);
        }
      })();
    }
  }, [reload, user]);

  useEffect(() => {
    (async () => {
      try {
        const employmentSectorsResponse =
          await employmentController.getEmploymentSectors();
        // console.log("employmentSectorsResponse: ", employmentSectorsResponse);
        setEmploymentSectors(employmentSectorsResponse);

        const employmentTypesResponse =
          await employmentController.getEmploymentTypes();
        // console.log("employmentTypesResponse: ", employmentTypesResponse);
        setEmploymentTypes(employmentTypesResponse);
      } catch (error) {
        console.log("Error getting employment types: ", error);
      }
    })();
  }, [showModal]);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      sector: 0,
      department: "",
      isCareerEmployee: false,
      salary: 0,
      address: "",
      phone: "",
      employment_type: 0,
      address2: "",
      city: "",
      state: "",
      country: "",
      ext: "",
      position: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const formattedValues = {
          ...formValues,
          startDate: formValues.startDate
            ? format(new Date(formValues.startDate), "yyyy-MM-dd")
            : null,
          endDate: formValues.endDate
            ? format(new Date(formValues.endDate), "yyyy-MM-dd")
            : null,
        };

        await employmentController.create(user.id, formattedValues);
        onReload();
        onClose();
      } catch (error) {
        console.error("Error submitting employment information: ", error);
      }
    },
  });

  const onReload = () => setReload((prevState) => !prevState);

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  const onClose = () => setShowModal((prevState) => !prevState);

  const handleSectorSelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
  };

  const handleEmploymentTypeSelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
  };

  const handleIsCareerEmployee = (e, { name, value }) => {
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h6 className={styles.title}>Datos laborales</h6>
            <button className="add_button" onClick={handleShowModal}>
              <span>Añadir</span>
              <Block.MaterialIcon icon="add" height="16px" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              {employments?.data ? (
                <div className={styles.employments}>
                  <>
                    {employments?.data?.map((employment) => {
                      console.log("Employment: ", employment);
                      {
                        return (
                          <EmploymentItem
                            key={employment.id}
                            employment={employment}
                            onReload={onReload}
                            updateUser={updateUser}
                            reload={reload}
                          />
                        );
                      }
                    })}
                    <div className={styles.notes}>
                      {/* <p>NOTA</p> */}
                      <ul>
                        <li>
                          Cuando estableces un Dato Laboral como predeterminado,
                          se utilizará dicha información como lugar de trabajo
                          actual para el envío de formularios.
                        </li>
                      </ul>
                    </div>
                  </>
                </div>
              ) : (
                <Shared.NoResult text="No has añadido ninguna información laboral." />
              )}
            </div>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Añadir Información Laboral"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Input
            type="text"
            name="companyName"
            label="Nombre de la Empresa"
            placeholder="Ingrese el nombre de la Empresa"
            onChange={formik.handleChange}
            value={formik?.values?.companyName}
            error={formik?.errors?.companyName}
          />

          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="department"
              label="Departamento"
              placeholder="Ingrese el nombre del Departamento"
              onChange={formik.handleChange}
              value={formik?.values?.department}
              error={formik?.errors?.department}
            />
            <Form.Input
              type="text"
              name="position"
              label="Posición"
              placeholder="Ingrese el nombre del cargo"
              onChange={formik.handleChange}
              value={formik?.values?.position}
              error={formik?.errors?.position}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              type="number"
              name="salary"
              label="Salário"
              placeholder="Ejemplo: 35,000"
              onChange={formik.handleChange}
              value={formik?.values?.salary}
              error={formik?.errors?.salary}
            />
            <Form.Select
              type="text"
              name="sector"
              label="Sector"
              placeholder="Selecciona"
              options={map(employmentSectors?.data, (sectorItem) => ({
                text: `${sectorItem?.attributes?.label}`,
                value: sectorItem?.id,
              }))}
              onChange={handleSectorSelect}
              value={formik?.values?.sector}
              error={formik?.errors?.sector}
            />
            <Form.Select
              type="text"
              name="isCareerEmployee"
              label="¿Es Empleado de Carrera?"
              placeholder="Selecciona"
              options={[
                { text: "Selecciona", value: "" },
                ...map(isCareerEmployeeOptions, (isCareerEmployeeItem) => ({
                  text: `${isCareerEmployeeItem?.text}`,
                  value: isCareerEmployeeItem?.value,
                })),
              ]}
              onChange={handleIsCareerEmployee}
              value={formik?.values?.isCareerEmployee}
              error={formik?.errors?.isCareerEmployee}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Select
              name="employment_type"
              label="Tipo de Empleo"
              placeholder="Selecciona"
              options={map(employmentTypes?.data, (type) => ({
                text: `${type?.attributes?.label}`,
                value: type?.id,
              }))}
              onChange={handleEmploymentTypeSelect}
              value={formik?.values?.employment_type}
              error={formik?.errors?.employment_type}
            />
            <Form.Input
              type="text"
              name="phone"
              label="Teléfono"
              placeholder="Ejemplo: 8095354404"
              onChange={formik.handleChange}
              value={formik?.values?.phone}
              error={formik?.errors?.phone}
            />
            <Form.Input
              type="text"
              name="ext"
              label="Extensión/Extensiones"
              placeholder="Ejemplo: 3000, 3001, etc."
              onChange={formik.handleChange}
              value={formik?.values?.ext}
              error={formik?.errors?.ext}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              type="date"
              name="startDate"
              label="Fecha de Inicio"
              onChange={formik.handleChange}
              value={
                formik?.values?.startDate &&
                new Date(formik?.values?.startDate)?.toISOString().split("T")[0]
              }
              error={formik?.errors?.startDate}
            />
            <Form.Input
              type="date"
              name="endDate"
              label="Fecha de Salida"
              onChange={formik.handleChange}
              value={
                formik?.values?.endDate &&
                new Date(formik?.values?.endDate).toISOString().split("T")[0]
              }
              error={formik?.errors?.endDate}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="address"
              label="Dirección"
              placeholder="Calle, Avenida, etc."
              onChange={formik.handleChange}
              value={formik?.values?.address}
              error={formik?.errors?.address}
            />
            <Form.Input
              type="text"
              name="address2"
              label="Dirección 2"
              placeholder="Dpto, Piso, etc."
              onChange={formik.handleChange}
              value={formik?.values?.address2}
              error={formik?.errors?.address2}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="city"
              label="Ciudad"
              placeholder="Ejemplo: Santo Domingo Oeste"
              onChange={formik.handleChange}
              value={formik?.values?.city}
              error={formik?.errors?.city}
            />
            <Form.Input
              type="text"
              name="state"
              label="Estado/Provincia"
              placeholder="Ejemplo: Santo Domingo"
              onChange={formik.handleChange}
              value={formik?.values?.state}
              error={formik?.errors?.state}
            />
            <Form.Input
              type="text"
              name="country"
              label="Pais"
              placeholder="Ejemplo: República Dominicana"
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
