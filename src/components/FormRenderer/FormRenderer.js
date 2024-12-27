import styles from "./FormRenderer.module.scss";
import { Shared } from "../Shared";
import { Button } from "semantic-ui-react";
import { map } from "lodash";
import { DatosPersonales } from "../Form/DatosPersonales";
import { DatosLaborales } from "../Form/DatosLaborales";
import { OtrosDatosLaborales } from "../Form/OtrosDatosLaborales";
import { ReferenciasPersonales } from "../Form/ReferenciasPersonales";
import { DatosDelPrestamo } from "../Form/DatosDelPrestamo";
import { DatosDelGarante } from "../Form/DatosDelGarante";
import { useAuth } from "@/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Form as FormSUI } from "semantic-ui-react";
import * as Yup from "yup";
import { initialValues } from "./FormRenderer.form";
import { CuentaBancaria } from "../Form/CuentaBancaria";
import { toast } from "react-toastify";
import { Loan, Bank, User } from "@/api";
import { useRouter } from "next/router";

const loanController = new Loan();
const bankController = new Bank();
const userController = new User();

export function FormRenderer({ formData }) {
  const { user } = useAuth();
  // console.log("user: ", user);
  const router = useRouter();

  if (!formData)
    return <Shared.NoResult text="No se encontraron datos para mostrar" />;

  // console.log("formData: ", formData);

  return (
    <>
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
          Ciudad: user?.defaultAddress?.city?.name || "",
          Provincia: user?.defaultAddress?.state?.name || "",
          Pais: user?.defaultAddress?.country?.name || "",
          CodigoPostal: user?.defaultAddress?.postalCode || "",
          HijosDependientes: user?.hasChildren ? user?.childrens : 0,
          Telefono:
            user?.defaultPhone && user?.defaultPhone?.type === "telefono"
              ? user?.defaultPhone?.number
              : "",
          Celular:
            user?.defaultPhone && user?.defaultPhone?.type === "movil"
              ? user?.defaultPhone?.number
              : "",
          Correo: user?.email || "",
          SocioDesde: null,
          LugarDeTrabajo: user?.currentJob?.companyName || "",
          Departamento: user?.currentJob?.department || "",
          Sector: user?.currentJob?.sector?.id || 0,
          VinculoLaboral: user?.currentJob?.employment_type?.id || 0,
          Cargo: user?.currentJob?.position || "",
          Salario: user?.currentJob?.salary || 0,
          DireccionTrabajo1: user?.currentJob?.address || "",
          DireccionTrabajo2: user?.currentJob?.address2 || "",
          CiudadDondeLabora: user?.currentJob?.city || "",
          ProvinciaDondeLabora: user?.currentJob?.state || "",
          PaisDondeLabora: user?.currentJob?.country || "",
          TelefonoTrabajo: user?.currentJob?.phone || "",
          Extension: user?.currentJob?.ext || "",
          FechaDeIngreso: user?.currentJob?.startDate || null,
          TrabajaEnLaMismaInstitucion: false,
          Grupo: 0,
          EsEmpleadoDeCarrera: false,
          ReferenciasPersonales: [
            {
              Cedula: "",
              Nombres: "",
              Apellidos: "",
              Apodo: "",
              Correo: "",
              Telefono: "",
              Celular: "",
              Relacion: 0,
              Direccion1: "",
              Direccion2: "",
              Ciudad: "",
              Provincia: "",
              Pais: "",
            },
          ],
          Tipo: 0,
          Monto: 0,
          Plazo: 0,
          Garantias: 0,
          MetodoDeDesembolso: 0,
          EntidadFinanciera: user?.bank_accounts[0]?.bank?.id || 0,
          TipoDeCuenta: user?.bank_accounts[0]?.type?.id || 0,
          NumeroDeCuenta: user?.bank_accounts[0]?.number || "",
          CedulaDelGarante: "",
          NombreDelGarante: "",
          ApellidoDelGarante: "",
          ApodoDelGarante: "",
          CorreoDelGarante: "",
          TelefonoDelGarante: "",
          CelularDelGarante: "",
          RelacionConElGarante: "",
          DireccionDelGarante: "",
          TerminosAceptados: false,
        }}
        onSubmit={async (formValues) => {
          // console.log("LoanRequestForm values: ", formValues);
          const loanTypeId = formValues.Tipo;
          const disbursementMethodId = formValues.MetodoDeDesembolso;
          const financialInstitutionId = formValues.EntidadFinanciera;
          const userGroupId = formValues.Grupo;

          try {
            const response = await loanController.sendLoanRequestApplication(
              user?.id,
              formValues
            );

            // console.log("Loan request Response: ", response);

            if (response) {
              const loanTypesResponse = await loanController.getLoanTypes();
              const loanTypesMatch = loanTypesResponse.data.find(
                (type) => type.id === loanTypeId
              );
              console.log("Loan types Match: ", loanTypesMatch);

              const loanDisbursementMethodsResponse =
                await loanController.getLoanDisbursementMethods();
              const loanDisbursementMethodsMatch =
                loanDisbursementMethodsResponse.data.find(
                  (method) => method.id === disbursementMethodId
                );
              console.log(
                "Loan disbursement methods Match: ",
                loanDisbursementMethodsMatch
              );

              const financialInstitutionsResponse =
                await bankController.getFinancialInstitutions();
              const financialInstitutionsMatch =
                financialInstitutionsResponse.data.find(
                  (institution) => institution.id === financialInstitutionId
                );
              console.log(
                "Financial institutions Match: ",
                financialInstitutionsMatch
              );

              const userGroupsResponse = await userController.getUserGroups();
              // console.log("User groups Response: ", userGroupsResponse);
              const userGroupsMatch = userGroupsResponse.data.find(
                (group) => group.id === userGroupId
              );
              console.log("User groups Match: ", userGroupsMatch);

              if (typeof window.gtag === "function") {
                window.gtag("event", "loan_request", {
                  user_id: user?.id,
                  loan_id: response.id,
                  user_group: userGroupsMatch?.attributes?.name,
                  is_carrer_employee: response.EsEmpleadoDeCarrera,
                  loan_type: loanTypesMatch?.attributes?.name,
                  loan_amount: response.Monto,
                  loan_term: response.Plazo,
                  disbursement_method:
                    loanDisbursementMethodsMatch?.attributes?.name,
                  financial_institution:
                    financialInstitutionsMatch?.attributes?.name,
                  institution: response.LugarDeTrabajo,
                  department: response.Departamento,
                  job_title: response.Cargo,
                  salary: response.Salario,
                  city: response.Ciudad,
                  state: response.Provincia,
                  country: response.Pais,
                });
              }

              toast.success("Solicitud de préstamo enviada con exito.");
              router.push("/me/applications/all");
            } else {
              toast.error("Error al enviar la solicitud de préstamo.");
            }
          } catch (error) {
            console.error("Error sending loan request: ", error);
            toast.error(
              "Ha ocurrido un error al enviar la solicitud de préstamo."
            );
          }
        }}
        validateOnChange={true}
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
          HijosDependientes: Yup.number().min(
            0,
            "El valor ingresado debe ser mayor a 0"
          ),
          Telefono: Yup.string(),
          Celular: Yup.string(),
          Correo: Yup.string().email("Formato de correo invalido"),
          SocioDesde: Yup.string().nullable(),
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
          FechaDeIngreso: Yup.string().nullable(),
          TrabajaEnLaMismaInstitucion: Yup.boolean(),
          Grupo: Yup.number().nullable(),
          EsEmpleadoDeCarrera: Yup.boolean().oneOf([true, false]),
          ReferenciasPersonales: Yup.array().of(
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
          Tipo: Yup.number().min(0, "Debes seleccionar un tipo de préstamo"),
          Monto: Yup.number(),
          Plazo: Yup.number(),
          Garantias: Yup.number().min(
            0,
            "Debes seleccionar un tipo de garantía."
          ),
          MetodoDeDesembolso: Yup.number().min(
            0,
            "Debes seleccionar un método de desembolso"
          ),
          EntidadFinanciera: Yup.number().nullable(),
          TipoDeCuenta: Yup.number().nullable(),
          NumeroDeCuenta: Yup.string().nullable(),
          CedulaDelGarante: Yup.string().nullable(),
          NombreDelGarante: Yup.string(),
          ApellidoDelGarante: Yup.string(),
          ApodoDelGarante: Yup.string(),
          CorreoDelGarante: Yup.string()
            .email("Formato de correo invalido")
            .nullable(),
          TelefonoDelGarante: Yup.string(),
          CelularDelGarante: Yup.string(),
          RelacionConElGarante: Yup.string().nullable(),
          DireccionDelGarante: Yup.string(),
          TerminosAceptados: Yup.boolean().oneOf(
            [true],
            "Debes aceptar los términos y condiciones."
          ),
        })}
      >
        {({ handleReset, handleSubmit, isSubmitting, ...formik }) => (
          <Form className="formik" onSubmit={handleSubmit}>
            {formData?.data &&
              map(formData.data.attributes, (data) => {
                {
                  /* console.log("component: ", data); */
                }

                switch (data.component) {
                  case "form.datos-personales":
                    return (
                      <DatosPersonales
                        component={data}
                        // values={formik?.values?.datosPersonales}
                        {...formik}
                      />
                    );
                    break;
                  case "form.datos-laborales":
                    return (
                      <DatosLaborales
                        component={data}
                        // values={formik?.values?.datosLaborales}
                        {...formik}
                      />
                    );
                    break;
                  case "form.otros-datos-laborales":
                    return (
                      <OtrosDatosLaborales
                        component={data}
                        // values={formik?.values?.otrosDatosLaborales}
                        {...formik}
                      />
                    );
                    break;
                  case "form.referencias-personales":
                    return (
                      <ReferenciasPersonales
                        component={data}
                        // values={formik?.values?.referenciasPersonales}
                        {...formik}
                      />
                    );
                    break;
                  case "form.datos-del-prestamo":
                    return (
                      <DatosDelPrestamo
                        component={data}
                        // values={formik?.values?.datosDelPrestamo}
                        {...formik}
                      />
                    );
                    break;
                  case "form.cuenta-bancaria":
                    return <CuentaBancaria component={data} {...formik} />;
                    break;
                  case "form.datos-del-garante":
                    return <DatosDelGarante component={data} {...formik} />;
                    break;
                  default:
                    break;
                }
              })}

            <div className="field">
              <label>
                <Field name="TerminosAceptados" type="checkbox" />
                He leído y aceptado los términos y condiciones del presente
                formulario.
              </label>
              <ErrorMessage name="TerminosAceptados" component="span" />
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleReset}
                className="edit_button"
              >
                Limpiar Formulario
              </button>
              <button
                type="submit"
                className="add_button"
                loading={isSubmitting}
              >
                Enviar Solicitud
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
