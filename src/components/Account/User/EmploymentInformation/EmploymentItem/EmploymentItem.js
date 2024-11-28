import styles from "./EmploymentItem.module.scss";
import { Block } from "@/components/Block";
import { Shared } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
import { Form, Radio } from "semantic-ui-react";
import { useFormik } from "formik";
import { User, EmploymentInformation } from "@/api";
import numeral from "numeral";
import { initialValues, validationSchema } from "./EmploymentItem.form";
import { map } from "lodash";
import { fn } from "@/utils";

const userController = new User();
const employmentController = new EmploymentInformation();

// const sectorOptions = [
//   { text: "Público", value: "publico" },
//   { text: "Privado", value: "privado" },
// ];

const isCareerEmployeeOptions = [
  { text: "SI", value: true },
  { text: "NO", value: false },
];

export function EmploymentItem(props) {
  const { employment, onReload } = props;
  console.log("employment: ", employment);

  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [employmentSectors, setEmploymentSectors] = useState(null);
  const [employmentTypes, setEmploymentTypes] = useState(null);

  const companyName = employment?.attributes?.companyName || "";
  const department = employment?.attributes?.department || "--";
  const position = employment?.attributes?.position || "--";
  const salary = employment?.attributes?.salary || "--";

  const sector = employment?.attributes?.sector?.data || {};
  const sectorLabel = sector.attributes?.label || "--";

  const isCareerEmployee = employment?.attributes?.isCareerEmployee;
  // console.log("isCareerEmployee: ", isCareerEmployee);

  const employment_type = employment?.attributes?.employment_type?.data || {};
  const employment_type_label = employment_type?.attributes?.label || "--";

  const phone = employment?.attributes?.phone || "";
  const ext = employment?.attributes?.ext || "";
  const formattedPhone = `${phone} ${ext ? `Ext. ${ext}` : ""}`;

  const startDate = employment?.attributes?.startDate
    ? new Date(employment?.attributes?.startDate).toISOString().split("T")[0]
    : null;
  const endDate = employment?.attributes?.endDate
    ? new Date(employment?.attributes?.endDate).toISOString().split("T")[0]
    : null;

  const formattedStartDate = startDate
    ? fn.formatDate(startDate, "DD/MM/YYYY")
    : "";
  const formattedEndDate = endDate ? fn.formatDate(endDate, "DD/MM/YYYY") : "";

  const address = employment?.attributes?.address || "";
  const address2 = employment?.attributes?.address2 || "";
  const city = employment?.attributes?.city || "";
  const state = employment?.attributes?.state || "";
  const country = employment?.attributes?.country || "";

  const formattedAddress = `${address + ","} ${
    address2 ? address2 + "," : ""
  } ${city ? city + "," : ""} ${state ? state + "," : ""} ${country}`;

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
    initialValues: initialValues({
      companyName,
      sector: sector.id,
      department,
      isCareerEmployee,
      salary,
      address,
      phone,
      employment_type: employment_type.id,
      address2,
      city,
      state,
      country,
      ext,
      position,
      startDate,
      endDate,
    }),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log(formValues);
      try {
        if (employment.id) {
          // console.log("employment id: ", employment.id);
          await employmentController.update(employment.id, user.id, formValues);
        } else {
          await employmentController.create(user.id, formValues);
        }
        onReload();
        onClose();
      } catch (error) {
        console.log("Error updating employment: ", error);
      }
    },
  });

  console.log("formik: ", formik);

  const onClose = () => {
    setShowModal(false);
  };
  const handleShowModal = () => setShowModal((prevState) => !prevState);
  const handleShowConfirm = () => setShowConfirm((prevState) => !prevState);

  const deleteOnConfirm = async () => {
    try {
      await employmentController.delete(employment.id);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

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
            <div>
              <h6 className={styles.title}>{companyName}</h6>
              <span>{formattedAddress}</span>
            </div>
            <div className={styles.actions}>
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
          <div className={styles.content}>
            {employment && (
              <div className={styles.contentWrapper}>
                <div>
                  <label>Departamento</label>
                  <span className={styles.department}>{department}</span>
                </div>
                <div>
                  <label>Posición</label>
                  <span className={styles.label}>{position}</span>
                </div>

                <div>
                  <label>Salário</label>
                  <span className={styles.salary}>
                    RD${numeral(salary).format("$0,0.00")}
                  </span>
                </div>

                <div>
                  <label>Sector</label>
                  <span className={styles.sector}>{sectorLabel}</span>
                </div>

                <div>
                  <label>¿Es empleado de Carrera?</label>
                  <span className={styles.sector}>
                    {isCareerEmployee ? "SI" : "NO"}
                  </span>
                </div>

                <div>
                  <label>Tipo de Empleo</label>
                  <span className={styles.sector}>{employment_type_label}</span>
                </div>

                <div>
                  <label>Teléfono</label>
                  <span className={styles.sector}>{formattedPhone}</span>
                </div>

                <div>
                  <label>Fecha de inicio</label>
                  <span className={styles.sector}>{formattedStartDate}</span>
                </div>

                <div>
                  <label>Fecha de finalización</label>
                  <span className={styles.sector}>{formattedEndDate}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Editar Información Laboral"
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
              options={map(isCareerEmployeeOptions, (isCareerEmployeeItem) => ({
                text: `${isCareerEmployeeItem?.text}`,
                value: isCareerEmployeeItem?.value,
              }))}
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

      <Shared.Confirm
        open={showConfirm}
        onConfirm={deleteOnConfirm}
        onCancel={handleShowConfirm}
        content="¿Quieres eliminar esta información laboral?"
      />
    </>
  );
}
