import styles from "./LoanRequestForm.module.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { initialValues } from "./LoanRequestForm.form";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useAuth } from "@/hooks";
import { FormGroup } from "semantic-ui-react";
import { MaritalStatus } from "@/api";
import { useEffect, useState } from "react";

const maritalStatusController = new MaritalStatus();

export function LoanRequestForm({ formData }) {
  console.log("LoanRequestForm formData: ", formData);
  const { user } = useAuth();
  console.log("user: ", user);

  const [maritalStatus, setMaritalStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const maritalStatusResponse = await maritalStatusController.find();
        console.log("maritalStatusResponse: ", maritalStatusResponse);
        setMaritalStatus(maritalStatusResponse);
      } catch (error) {
        console.log("Error loading marital status: ", error);
      }
    })();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          Cedula: user?.username || "",
          NumeroDeSocio: user?.memberId || "",
          Nombres: user?.firstName || "",
          Apellidos: user?.lastName || "",
          Apodo: user?.nickname || "",
          EstadoCivil: user?.maritalStatus?.id || 0,
          Direccion1: user?.defaultAddress?.address || "",
          Direccion2: user?.defaultAddress?.address2 || "",
          //   Ciudad,
          //   Provincia,
          //   Pais,
          //   CodigoPostal,
          //   HijosDependientes,
          //   Telefono,
          //   Celular,
          //   Correo,
          //   SocioDesde,
          //   LugarDeTrabajo,
          //   Departamento,
          //   Sector,
          //   VinculoLaboral,
          //   Cargo,
          //   Salario,
          //   DireccionTrabajo1,
          //   DireccionTrabajo2,
          //   CiudadDondeLabora,
          //   ProvinciaDondeLabora,
          //   PaisDondeLabora,
          //   TelefonoTrabajo,
          //   Extension,
          //   FechaDeIngreso,
          //   TrabajaEnLaMismaInstitucion,
          //   Grupo,
          //   EsEmpleadoDeCarrera,
          //   referenciasPersonales,
          //   Tipo,
          //   Monto,
          //   Plazo,
          //   Garantias,
          //   MetodoDesembolso,
          //   EntidadFinanciera,
          //   TipoDeCuenta,
          //   NumeroDeCuenta,
          //   CedulaDelGarante,
          //   NombreDelGarante,
          //   ApellidoDelGarante,
          //   ApodoDelGarante,
          //   CorreoDelGarante,
          //   TelefonoDelGarante,
          //   CelularDelGarante,
          //   RelacionConElGarante,
          //   DireccionDelGarante,
          TerminosAceptados: false,
        }}
        onSubmit={(formValues) => {
          console.log("LoanRequestForm values: ", formValues);
        }}
        validationSchema={Yup.object({
          Cedula: Yup.string()
            .max(
              11,
              "El número de cédula debe tener un maximo de 11 caracteres, sin guiones ni espacios."
            )
            .required("El número de cédula es requerida"),
          NumeroDeSocio: Yup.string().required(
            "El número de socio es requerido"
          ),
          Nombres: Yup.string().required("El nombre es requerido"),
          Apellidos: Yup.string().required("El apellido es requerido"),
          Apodo: Yup.string(),
          EstadoCivil: Yup.number(),
          Direccion1: Yup.string(),
          Direccion2: Yup.string(),
          Ciudad: Yup.string(),
          Provincia: Yup.string(),
          Pais: Yup.string(),
          CodigoPostal: Yup.string(),
          HijosDependientes: Yup.number(),
          Telefono: Yup.string(),
          Celular: Yup.string(),
          Correo: Yup.string().email("Formato de correo invalido"),
          SocioDesde: Yup.string(),
          LugarDeTrabajo: Yup.string(),
          Departamento: Yup.string(),
          Sector: Yup.number(),
          VinculoLaboral: Yup.number(),
          Cargo: Yup.string(),
          Salario: Yup.number(),
          DireccionTrabajo1: Yup.string(),
          DireccionTrabajo2: Yup.string(),
          CiudadDondeLabora: Yup.string(),
          ProvinciaDondeLabora: Yup.string(),
          PaisDondeLabora: Yup.string(),
          TelefonoTrabajo: Yup.string(),
          Extension: Yup.string(),
          FechaDeIngreso: Yup.string(),
          TrabajaEnLaMismaInstitucion: Yup.boolean(),
          Grupo: Yup.number(),
          EsEmpleadoDeCarrera: Yup.boolean(),
          referenciasPersonales: Yup.array().of(
            Yup.object({
              Cedula: Yup.string(),
              Nombres: Yup.string(),
              Apellidos: Yup.string(),
              Apodo: Yup.string(),
              Correo: Yup.string().email("Formato de correo invalido"),
              Telefono: Yup.string(),
              Celular: Yup.string(),
              Relacion: Yup.number(),
              Direccion1: Yup.string(),
              Direccion2: Yup.string(),
              Ciudad: Yup.string(),
              Provincia: Yup.string(),
              Pais: Yup.string(),
            })
          ),
          Tipo: Yup.number(),
          Monto: Yup.number(),
          Plazo: Yup.number(),
          Garantias: Yup.number(),
          MetodoDesembolso: Yup.number(),
          EntidadFinanciera: Yup.number(),
          TipoDeCuenta: Yup.number(),
          NumeroDeCuenta: Yup.string(),
          CedulaDelGarante: Yup.string(),
          NombreDelGarante: Yup.string(),
          ApellidoDelGarante: Yup.string(),
          ApodoDelGarante: Yup.string(),
          CorreoDelGarante: Yup.string().email("Formato de correo invalido"),
          TelefonoDelGarante: Yup.string(),
          CelularDelGarante: Yup.string(),
          RelacionConElGarante: Yup.number(),
          DireccionDelGarante: Yup.string(),
          TerminosAceptados: Yup.boolean().oneOf(
            [true],
            "Debes aceptar los términos y condiciones."
          ),
        })}
      >
        {(formik) => (
          <Form className={styles.form}>
            {/* {formData?.data &&
              formData.data?.attributes?.map(({ component }) => {
                switch (component) {
                  case "form.datos-personales":
                    return (
                      <section>
                        <h5>Datos Personales</h5>
                        <div className={styles.fields}>
                          {component.data.attributes.map((field) => {
                            let value = null;
                            let options = [];

                            switch (field.name) {
                              case "Cedula":
                            }
                          })}
                        </div>
                      </section>
                    );
                    break;
                }
              })} */}

            <h5>Datos Personales</h5>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="Cedula">Cedula</label>
                <Field name="Cedula" type="text" />
                <ErrorMessage name="Cedula" component="span" />
              </div>

              <div className={styles.field}>
                <label htmlFor="NumeroDeSocio">Número de socio</label>
                <Field name="NumeroDeSocio" type="text" />
                <ErrorMessage name="NumeroDeSocio" component="span" />
              </div>

              <div className={styles.field}>
                <label htmlFor="Nombres">Nombres</label>
                <Field name="Nombres" type="text" />
                <ErrorMessage name="Nombres" component="span" />
              </div>

              <div className={styles.field}>
                <label htmlFor="Apellidos">Apellidos</label>
                <Field name="Apellidos" type="text" />
                <ErrorMessage name="Apellidos" component="span" />
              </div>
            </div>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="Apodo">Apodo</label>
                <Field name="Apodo" type="text" />
                <ErrorMessage name="Apodo" component="span" />
              </div>

              <div className={styles.field}>
                <label htmlFor="EstadoCivil">Estado civil</label>
                <Field name="EstadoCivil" as="select">
                  {maritalStatus?.data?.map((option) => (
                    <option value={option?.id}>
                      {option?.attributes?.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="EstadoCivil" component="span" />
              </div>
            </div>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="Direccion1">Dirección 1</label>
                <Field name="Direccion1" type="text" />
                <ErrorMessage name="Direccion1" component="span" />
              </div>
              <div className={styles.field}>
                <label htmlFor="Direccion2">Dirección 1</label>
                <Field name="Direccion2" type="text" />
                <ErrorMessage name="Direccion2" component="span" />
              </div>
            </div>

            <div className={styles.field}>
              <label>
                <Field name="TerminosAceptados" type="checkbox" />
                He leído y aceptado los términos y condiciones del presente
                formulario.
              </label>
              <ErrorMessage name="TerminosAceptados" component="span" />
            </div>

            <div className={styles.actions}>
              <Button primary type="submit">
                Enviar solicitud
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
