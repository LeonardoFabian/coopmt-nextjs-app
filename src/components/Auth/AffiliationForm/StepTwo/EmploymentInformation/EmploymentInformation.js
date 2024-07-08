import styles from "./EmploymentInformation.module.scss";
import { Form, Radio } from "semantic-ui-react";
import { map } from "lodash";
import { Shared } from "@/components/Shared";
import { Country, State, City } from "@/api";
import { useState, useEffect } from "react";

const countryController = new Country();
const stateController = new State();
const cityController = new City();

export function EmploymentInformation({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) {
  const sectors = [
    { key: "publico", text: "Público", value: "publico" },
    { key: "privado", text: "Privado", value: "privado" },
  ];
  const isCareerEmployeeOptions = [
    { label: "NO", name: "isCareerEmployee", value: "false" },
    { label: "SI", name: "isCareerEmployee", value: "true" },
  ];
  const employmentTypeOptions = [
    { key: "fijo", text: "Fijo", value: "fijo" },
    { key: "contratado", text: "Contratado", value: "contratado" },
    { key: "jubilado", text: "Jubilado", value: "jubilado" },
  ];

  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(0);

  const handleSectorSelect = (e, { name, value }) => {
    setFieldValue(name, value);
  };

  const handleEmploymentTypeSelect = (e, { name, value }) => {
    setFieldValue(name, value);
  };

  // get all countries
  useEffect(() => {
    (async () => {
      try {
        const response = await countryController.find();
        // console.log("AffiliateForm countries: ", response);
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // get all states by country
  useEffect(() => {
    (async () => {
      try {
        const response = await stateController.findByCountry(selectedCountryId);
        // console.log("AffiliateForm states: ", response);
        setStates(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedCountryId]);

  // get all cities by state
  useEffect(() => {
    (async () => {
      try {
        const response = await cityController.findByState(selectedStateId);
        // console.log("AffiliateForm cities: ", response);
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedStateId]);

  /**
   * Stores the selected country id
   * @param {*} e
   * @param {*} param1
   */
  const handleCountrySelect = (e, { name, value }) => {
    setFieldValue(name, value);
    setSelectedCountryId(value);
  };

  /**
   * Stores the selected state id
   * @param {*} e
   * @param {*} param1
   */
  const handleStateSelect = (e, { name, value }) => {
    setFieldValue(name, value);
    setSelectedStateId(value);
  };

  /**
   * stores the selected city id
   * @param {*} e
   * @param {*} param1
   */
  const handleCitySelect = (e, { name, value }) => {
    setFieldValue(name, value);
    setSelectedCityId(value);
  };

  const handleIsCareerEmployee = (e, { name, value }) => {
    setFieldValue(name, value);
  };

  return (
    <div className={styles.employmentInfo}>
      <h5>Datos Laborales</h5>

      <Form.Input
        type="text"
        name="employmentInformation.companyName"
        label="Lugar de trabajo"
        placeholder="Nombre de la empresa o institución"
        value={values?.employmentInformation.companyName}
        onChange={handleChange}
        error={errors?.employmentInformation?.companyName}
      />

      <Form.Group widths="equal">
        <Form.Input
          type="text"
          name="employmentInformation.department"
          label="Departamento"
          placeholder="Nombre del departamento"
          value={values?.employmentInformation.department}
          onChange={handleChange}
          error={errors?.employmentInformation?.department}
        />
        <Form.Select
          name="employmentInformation.sector"
          label="Sector"
          placeholder="Sector al que pertenece"
          options={map(sectors, (sector) => ({
            text: `${sector.text}`,
            value: sector.value,
          }))}
          onChange={handleSectorSelect}
          value={values.employmentInformation.sector}
          error={errors?.employmentInformation?.sector}
        />
        {values.employmentInformation.sector === "publico" && (
          <Form.Field>
            <label>Es empleado de Carrera Administrativa?</label>
            <Form.Group inline widths="equal">
              <Form.Field>
                <Radio
                  label="NO"
                  name="employmentInformation.isCareerEmployee"
                  value={false}
                  checked={
                    values.employmentInformation.isCareerEmployee === false
                  }
                  onChange={handleIsCareerEmployee}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="SI"
                  name="employmentInformation.isCareerEmployee"
                  value={true}
                  checked={
                    values.employmentInformation.isCareerEmployee === true
                  }
                  onChange={handleIsCareerEmployee}
                />
              </Form.Field>
            </Form.Group>
          </Form.Field>
        )}
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Select
          name="employmentInformation.employmentType"
          label="Vinculo laboral"
          placeholder="Seleccione su vinculo laboral"
          options={map(employmentTypeOptions, (type) => ({
            text: `${type.text}`,
            value: type.value,
          }))}
          value={values.employmentInformation.employmentType}
          error={errors?.employmentInformation?.employmentType}
          onChange={handleEmploymentTypeSelect}
        />
        <Form.Input
          type="number"
          name="employmentInformation.salary"
          label="Salario (RD$)"
          placeholder="0.00"
          value={values?.employmentInformation.salary}
          onChange={handleChange}
          error={errors?.employmentInformation?.salary}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Select
          name="employmentInformation.employmentCountry"
          label="País"
          placeholder="Selecciona tu país"
          options={map(countries, (country) => ({
            text: `${country.attributes.name}`,
            value: country.id,
          }))}
          onChange={handleCountrySelect}
          value={values?.employmentInformation?.employmentCountry}
        />
        <Form.Select
          name="employmentInformation.employmentState"
          label="Estado/Provincia"
          placeholder="Selecciona"
          options={map(states, (state) => ({
            text: `${state.attributes.name}`,
            value: state.id,
          }))}
          onChange={handleStateSelect}
          value={values?.employmentInformation?.employmentState}
        />
        <Form.Select
          name="employmentInformation.employmentCity"
          label="Ciudad/Municipio"
          placeholder="Selecciona"
          options={map(cities, (city) => ({
            text: `${city.attributes.name}`,
            value: city.id,
          }))}
          onChange={handleCitySelect}
          value={values?.employmentInformation?.employmentCity}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="employmentInformation.employmentAddress"
          type="text"
          label="Domicilio (calle, casa, edificio, apartamento)"
          placeholder="Calle, número de casa o apartamento, edificio"
          value={values?.employmentInformation.employmentAddress}
          onChange={handleChange}
          error={errors?.employmentInformation?.employmentAddress}
        />
        <Form.Input
          name="employmentInformation.employmentAddress2"
          type="text"
          label="Sector, municipio"
          placeholder="Sector y municipio de domicilio"
          value={values?.employmentInformation.employmentAddress2}
          onChange={handleChange}
          error={errors?.employmentInformation?.employmentAddress2}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="employmentInformation.employmentPhone"
          type="text"
          label="Télefono"
          placeholder="Ej.: 8095555555"
          value={values?.employmentInformation.employmentPhone}
          onChange={handleChange}
          error={errors?.employmentInformation?.employmentPhone}
        />
        <Form.Input
          name="employmentInformation.employmentPhoneExt"
          type="text"
          label="Ext"
          placeholder="Ej.: 9999"
          value={values?.employmentInformation.employmentPhoneExt}
          onChange={handleChange}
          error={errors?.employmentInformation?.employmentPhoneExt}
        />
      </Form.Group>
    </div>
  );
}
