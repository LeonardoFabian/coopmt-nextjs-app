import styles from "./PersonalInfo.module.scss";

import { Form, Icon, FormGroup, FormField, Radio } from "semantic-ui-react";
import { Address, Country, State, City } from "@/api";
import { map } from "lodash";
import { useState, useEffect } from "react";
import { Shared } from "@/components/Shared";
import { User } from "@/api";

const userController = new User();
const countryController = new Country();
const stateController = new State();
const cityController = new City();

export function PersonalInfo({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) {
  const hasChildrensOptions = [
    {
      label: "NO",
      name: "hasChildrens",
      value: 0,
    },
    {
      label: "SI",
      name: "hasChildrens",
      value: 1,
    },
  ];
  const genders = [
    { key: "m", text: "Masculino", value: "M" },
    { key: "f", text: "Femenino", value: "F" },
    { key: "ns", text: "No especificado", value: "NS" },
  ];
  const maritalStatus = [
    { key: "", text: "-Selecciona tu estado civil-", value: null },
    { key: "casado", text: "Casado/a", value: "casado" },
    { key: "soltero", text: "Soltero/a", value: "soltero" },
    { key: "union libre", text: "Union libre", value: "union libre" },
  ];
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(0);

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

  /**
   * Validate that the documentId is not registered
   * @param {string} documentId Document ID
   */
  const validateDocumentId = async (documentId) => {
    let error;
    try {
      const response = await userController.getByDocumentId(documentId);
      if (response) {
        error =
          "Este número de documento ya está registrado en nuestra base de datos.";
      }
    } catch (error) {
      console.error(error);
    }
    return error;
  };

  const handleGenderSelect = (e, { name, value }) => {
    setFieldValue(name, value);
  };

  const handleMaritalStatusSelect = (e, { name, value }) => {
    setFieldValue(name, value);
  };

  const handleHasChildrens = (e, { name, value }) => {
    setFieldValue(name, value);
  };

  return (
    <div className={styles.personalInfo}>
      <h5>Datos personales</h5>
      <Form.Group>
        <Form.Input
          type="text"
          name="documentId"
          label="Cédula"
          placeholder="Cédula de identidad"
          width={4}
          value={values?.documentId}
          onChange={handleChange}
          error={errors?.documentId}
        />

        <Form.Input
          width={8}
          type="text"
          name="firstName"
          label="Nombre"
          placeholder="Nombre"
          value={values?.firstName}
          onChange={handleChange}
          error={errors?.firstName}
        />
        <Form.Input
          width={8}
          type="text"
          name="lastName"
          label="Apellido"
          placeholder="Apellido"
          value={values?.lastName}
          onChange={handleChange}
          error={errors?.lastName}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          type="text"
          name="alias"
          label="Apodo"
          placeholder="Apodo"
          value={values?.alias}
          onChange={handleChange}
          error={errors?.alias}
        />
        <Form.Select
          name="gender"
          label="Género"
          placeholder="Selecciona tu género"
          options={map(genders, (gender) => ({
            text: `${gender.text}`,
            value: gender.value,
          }))}
          onChange={handleGenderSelect}
          value={values?.gender}
          error={errors.gender}
        />
        <Form.Select
          name="maritalStatus"
          label="Estado civil"
          placeholder="Selecciona tu estado civil"
          options={map(maritalStatus, (status) => ({
            text: `${status.text}`,
            value: status.value,
          }))}
          onChange={handleMaritalStatusSelect}
          value={values?.maritalStatus}
          error={errors.maritalStatus}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Select
          name="location.country"
          label="País (domicilio)"
          placeholder="Selecciona"
          options={map(countries, (country) => ({
            text: `${country.attributes.name}`,
            value: country.id,
          }))}
          onChange={handleCountrySelect}
          value={values.location.country}
          error={errors?.location?.country}
        />
        <Form.Select
          name="location.state"
          label="Estado o Provincia (domicilio)"
          placeholder="Selecciona"
          options={map(states, (state) => ({
            text: `${state.attributes.name}`,
            value: state.id,
          }))}
          onChange={handleStateSelect}
          value={values?.location.state}
          error={errors?.location?.state}
        />
        <Form.Select
          name="location.city"
          label="Ciudad o Municipio (domicilio)"
          placeholder="Selecciona"
          options={map(cities, (city) => ({
            text: `${city.attributes.name}`,
            value: city.id,
          }))}
          onChange={handleCitySelect}
          value={values?.location.city}
          error={errors?.location?.city}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="location.address"
          type="text"
          label="Domicilio (calle, casa, edificio, apartamento)"
          placeholder="Calle, número de casa o apartamento, edificio"
          value={values?.location.address}
          onChange={handleChange}
          error={errors?.location?.address}
        />
        <Form.Input
          name="location.address2"
          type="text"
          label="Sector, municipio"
          placeholder="Sector y municipio de domicilio"
          value={values?.location.address2}
          onChange={handleChange}
          error={errors?.location?.address2}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          type="text"
          name="location.postalCode"
          label="Código postal"
          placeholder="Ej.: 10100"
          value={values?.location.postalCode}
          onChange={handleChange}
          error={errors?.location?.postalCode}
        />
        <Form.Field>
          <label>Tiene hijos dependientes?</label>
          <Form.Group inline widths="equal">
            <Form.Field>
              <Radio
                label="NO"
                name="hasChildrens"
                value={false}
                checked={values.hasChildrens === false}
                onChange={handleHasChildrens}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="SI"
                name="hasChildrens"
                value={true}
                checked={values.hasChildrens === true}
                onChange={handleHasChildrens}
              />
            </Form.Field>
          </Form.Group>
        </Form.Field>

        {values.hasChildrens === true && (
          <Form.Input
            type="number"
            name="childrensQty"
            label="Hijos dependientes (cantidad)"
            placeholder="0"
            value={values?.childrensQty}
            onChange={handleChange}
            error={errors?.childrensQty}
          />
        )}
      </Form.Group>

      <Form.Input
        name="email"
        type="text"
        label="Correo electrónico"
        placeholder="juanperez@example.com"
        value={values?.email}
        onChange={handleChange}
        error={errors?.email}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="phone"
          type="text"
          label="Télefono"
          placeholder="Ej.: 8095555555"
          value={values?.phone}
          onChange={handleChange}
          error={errors?.phone}
        />
        <Form.Input
          name="mobile"
          type="text"
          label="Celular"
          placeholder="Ej.: 8095555555"
          value={values?.mobile}
          onChange={handleChange}
          error={errors?.mobile}
        />
      </Form.Group>
    </div>
  );
}
