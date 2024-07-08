import styles from "./TermsAndConditions.module.scss";
import { Form, Checkbox } from "semantic-ui-react";
import { Field } from "formik";
import { useState, useEffect } from "react";
import { map } from "lodash";
import { Shared } from "@/components/Shared";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";

export function TermsAndConditions({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
  getFieldProps,
}) {
  const [authorizations, setAuthorizations] = useState(null);

  const handleMonthlySavingsAccepted = (e, { name, checked }) => {
    setFieldValue(name, checked);
  };

  const handleEnrollmentPaymentAccepted = (e, { name, checked }) => {
    setFieldValue(name, checked);
  };

  return (
    <div className={styles.userAuthorizations}>
      <div className={styles.wrapper}>
        <h5>Términos y Condiciones</h5>
        <Form.Group>
          <Form.Field width={12}>
            <Checkbox
              label="Autorizo un descuento mensual como aporte de capital por la suma
              de RD$"
              name="monthlySavingsAccepted"
              id="monthlySavingsAccepted"
              checked={values.monthlySavingsAccepted}
              onChange={handleMonthlySavingsAccepted}
             
            />
            {touched?.monthlySavingsAccepted && errors?.monthlySavingsAccepted && (
              <div style={{ color: 'red' }}>{errors.monthlySavingsAccepted}</div>
            )}
          </Form.Field>
          <Form.Field width={4}>
            <Form.Input  
              name="monthlySavingsContribution"
              id="monthlySavingsContribution"           
              type="number"
              placeholder="0.00"
              value={values.monthlySavingsContribution}
              onChange={handleChange}
            />
            {touched?.monthlySavingsContribution && errors?.monthlySavingsContribution && (
                <div style={{ color: 'red' }}>{errors.monthlySavingsContribution}</div>
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group >
          <Form.Field width={12}>
            <Checkbox           
              name="enrollmentPaymentAccepted"
              id="enrollmentPaymentAccepted"
              label="Declaro mi interes de ser socio de la cooperativa,
              comprometiendome a cumplir la Ley 127-64 sobre
              Asociaciones Cooperativas, los Estatutos y Reglamentos de la entidad, y acepto
              pagar por concepto de inscripción, no reembolsable, la suma de RD$"
              checked={values.enrollmentPaymentAccepted}
              onChange={handleEnrollmentPaymentAccepted}
            />        
            {touched?.enrollmentPaymentAccepted && errors?.enrollmentPaymentAccepted && (
              <div style={{ color: 'red' }}>{errors.enrollmentPaymentAccepted}</div>
            )}    
          </Form.Field>
            <Form.Field width={4}>
              <Form.Input
                name="enrollmentPayment"
                id="enrollmentPayment"
                type="number"
                placeholder="0.00"
                value={values.enrollmentPayment}          
                onChange={handleChange}
              />
              {touched?.enrollmentPayment && errors?.enrollmentPayment && (
                  <div style={{ color: 'red' }}>{errors.enrollmentPayment}</div>
              )}
            </Form.Field>
          
        </Form.Group>
        <Shared.Separator height={16} />
        <Form.Field>
          <Checkbox
            name="termsAndConditionsAccepted"
            id="termsAndConditionsAccepted"
            label="He leído y acepto los Términos y Condiciones."
            checked={values.termsAndConditionsAccepted}
            onChange={handleChange}
          />
          {touched?.termsAndConditionsAccepted && errors?.termsAndConditionsAccepted && (
              <div style={{ color: 'red' }}>{errors.termsAndConditionsAccepted}</div>
            )}
        </Form.Field>
        <Form.Field>
          <Checkbox
            name="privacyPolicyAccepted"
            id="privacyPolicyAccepted"
            label="He leído y acepto la Política de Privacidad."
            checked={values.privacyPolicyAccepted}
            onChange={handleChange}
          />
          {touched?.privacyPolicyAccepted && errors?.privacyPolicyAccepted && (
              <div style={{ color: 'red' }}>{errors.privacyPolicyAccepted}</div>
            )}
        </Form.Field>
      </div>
    </div>
  );
}
