import styles from "./Preview.module.scss";
import { Option } from "@/api";
import { useState, useEffect } from "react";
import { map, size } from "lodash";

const optionController = new Option();

export function Preview(props) {
  const { values } = props;
  const [options, setOptions] = useState(null);

  console.log(values.beneficiaries);

  const hasBeneficiaries = size(values.beneficiaries) > 0;

  useEffect(() => {
    (async () => {
      try {
        const response = await optionController.getAll();
        console.log("Preview options response: ", response);
        setOptions(response.data);
      } catch (error) {
        console.error("Options request error: ", error);
      }
    })();
  }, []);

  return (
    <div className={styles.preview}>
      <div className={styles.header}>
        <p>{`${options?.attributes?.name}`}</p>
        <p>{options?.attributes?.ISO}</p>
        <p>{`RNC: ${options?.attributes?.RNC}`}</p>
        <h6>
          <strong>Solicitud de Afiliación</strong>
        </h6>
      </div>
      <div className={styles.content}>
        <section>
          <div className={styles.sectionHeader}>
            <p>
              <strong>Datos Personales</strong>
            </p>
          </div>
          <div className={styles.fullName}>
            <div>
              <small>Nombre</small>
              {values.firstName}
            </div>
            <div>
              <small>Nombre</small>
              {values.lastName}
            </div>
            <div>
              <small>Apodo</small>
              {values.alias || "--"}
            </div>
          </div>
          <div>
            <div>
              <small>Cédula</small>
              {values.documentId}
            </div>
            <div>
              <small>Estado Civil</small>
              {values.maritalStatus}
            </div>
            <div>
              <small>Tiene hijos?</small>
              {values.hasChildrens === true ? "SI" : "NO"}
            </div>
            <div>
              <small>Hijos dependientes</small>
              {values.childrensQty}
            </div>
          </div>
          <div>
            <div>
              <small>País</small>
              {values.location.country}
            </div>
            <div>
              <small>Estado o Provincia</small>
              {values.location.state}
            </div>
            <div>
              <small>Ciudad o Municipio</small>
              {values.location.city}
            </div>
          </div>
          <div>
            <div>
              <small>Domicilio (calle)</small>
              {values.location.address}
            </div>
            <div>
              <small>Sector</small>
              {values.location.address2}
            </div>
          </div>
          <div>
            <div>
              <small>Correo</small>
              {values.email}
            </div>
            <div>
              <small>Télefono</small>
              {values.phone || "--"}
            </div>
            <div>
              <small>Celular</small>
              {values.mobile || "--"}
            </div>
          </div>
        </section>
        <section>
          <div className={styles.sectionHeader}>
            <p>
              <strong>Datos Laborales</strong>
            </p>
          </div>
          <div>
            <div>
              <small>Empresa o institución</small>
              {values.employmentInformation.companyName}
            </div>
            <div>
              <small>Departamento</small>
              {values.employmentInformation.department}
            </div>
            <div>
              <small>Salario</small>
              {`RD$${values.employmentInformation.salary}`}
            </div>
          </div>
          <div>
            <div>
              <small>Fecha de ingreso</small>
              {`FECHA AQUI`}
            </div>
            <div>
              <small>Vinculo laboral</small>
              {values.employmentInformation.employmentType}
            </div>
            <div>
              <small>Sector</small>
              {values.employmentInformation.sector}
            </div>
            <div>
              <small>Es empleado de carrera?</small>
              {values.employmentInformation.isCareerEmployee === true
                ? "SI"
                : "NO"}
            </div>
          </div>
          <div>
            <div>
              <small>País</small>
              {values.employmentInformation.employmentCountry}
            </div>
            <div>
              <small>Estado o Provincia</small>
              {values.employmentInformation.employmentState}
            </div>
            <div>
              <small>Ciudad o Municipio</small>
              {values.employmentInformation.employmentCity}
            </div>
          </div>
          <div>
            <div>
              <small>Domicilio (calle)</small>
              {values.employmentInformation.employmentAddress}
            </div>
            <div>
              <small>Sector</small>
              {values.employmentInformation.employmentAddress2 || "--"}
            </div>
          </div>
          <div>
            <div>
              <small>Télefono</small>
              {values.employmentInformation.employmentPhone}
            </div>
            <div>
              <small>Ext.</small>
              {values.employmentInformation.employmentPhoneExt || "--"}
            </div>
          </div>
        </section>
        <section>
          <div className={styles.sectionHeader}>
            <p>
              <strong>Beneficiarios</strong>
            </p>
          </div>

          {hasBeneficiaries && (
            <div className={styles.beneficiaries}>
              {map(values.beneficiaries, (beneficiary, index) => (
                <>
                  <div>
                    <div>
                      <small>Cédula</small>
                      {beneficiary.beneficiaryDocumentId || "--"}
                    </div>
                    <div>
                      <small>Nombre</small>
                      {beneficiary.beneficiaryFirstName || "--"}
                    </div>
                    <div>
                      <small>Apellido</small>
                      {beneficiary.beneficiaryLastName || "--"}
                    </div>

                    <div>
                      <small>Relación</small>
                      {beneficiary.beneficiaryRelationship || "--"}
                    </div>
                    <div>
                      <small>Télefono</small>
                      {beneficiary.beneficiaryPhone || "--"}
                    </div>
                    <div>
                      <small>Celular</small>
                      {beneficiary.beneficiaryMobile || "--"}
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </section>
        <section>
          <div>
            <div>
              <ul>
                <li>
                  <p>
                    Autorizo un descuento mensual como aporte de capital por la
                    suma de
                    <strong>{` RD$${values.monthlySavingsContribution}`}</strong>
                  </p>
                </li>
                <li>
                  <p>
                    Declaro mi interes de ser socio de la cooperativa,
                    comprometiendome a cumplir la Ley 127-64 sobre Asociaciones
                    Cooperativas, los Estatutos y Reglamentos de la entidad, y
                    acepto pagar la suma de
                    <strong>{` RD$${values.enrollmentPayment} `}</strong>
                    por concepto de inscripción, no reembolsable.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className={styles.applicantSection}>
          <div>
            <small>Firma</small>
          </div>
          <div>
            <small>Cédula</small>
          </div>
        </div>
        <div style={{ margin: "0 auto" }}>
          <small>Recepción (para uso exclusivo de la Cooperativa)</small>
        </div>
        <div className={styles.coopSection}>
          <div>
            <small>Fecha</small>
          </div>
          <div>
            <small>Recibido por</small>
          </div>
        </div>
      </div>
    </div>
  );
}
