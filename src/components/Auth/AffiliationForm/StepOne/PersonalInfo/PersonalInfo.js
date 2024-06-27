import styles from "./PersonalInfo.module.scss";

import {
  FormTextArea,
  FormSelect,
  FormRadio,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormButton,
  FormField,
  Form,
  Icon,
} from "semantic-ui-react";
import { Address, Country, State, City } from "@/api";
import { map } from "lodash";
import { useState, useEffect } from "react";
import { Shared } from "@/components/Shared";
import { User } from "@/api";

const userController = new User();
const addressController = new Address();
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
      value: "false",
    },
    {
      label: "SI",
      name: "hasChildrens",
      value: "true",
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
  const handleCountrySelect = (e) => {
    setSelectedCountryId(e.target.value);
  };

  /**
   * Stores the selected state id
   * @param {*} e
   * @param {*} param1
   */
  const handleStateSelect = (e) => {
    setSelectedStateId(e.target.value);
  };

  /**
   * stores the selected city id
   * @param {*} e
   * @param {*} param1
   */
  const handleCitySelect = (e) => {
    setSelectedCityId(e.target.value);
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
        {errors?.documentId && touched?.documentId && (
          <div>{errors.documentId}</div>
        )}
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
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Select
          name="country"
          label="País"
          placeholder="Selecciona tu país"
          options={map(countries, (country) => ({
            text: `${country.attributes.name}`,
            value: country.id,
          }))}
          onChange={handleCountrySelect}
          value={values?.country}
        />
        <Form.Select
          name="state"
          label="Estado/Provincia"
          placeholder="Selecciona"
          options={map(states, (state) => ({
            text: `${state.attributes.name}`,
            value: state.id,
          }))}
          onChange={handleStateSelect}
          value={values?.state}
        />
        <Form.Select
          name="city"
          label="Ciudad/Municipio"
          placeholder="Selecciona"
          options={map(cities, (city) => ({
            text: `${city.attributes.name}`,
            value: city.id,
          }))}
          onChange={handleCitySelect}
          value={values?.city}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="address"
          type="text"
          label="Domicilio (calle, casa, edificio, apartamento)"
          placeholder="Calle, número de casa o apartamento, edificio"
          value={values?.address}
          onChange={handleChange}
          error={errors?.address}
        />
        <Form.Input
          name="address2"
          type="text"
          label="Sector, municipio"
          placeholder="Sector y municipio de domicilio"
          value={values?.address2}
          onChange={handleChange}
          error={errors?.address2}
        />
      </Form.Group>

      <Form.Group>
        <Form.Input
          width={4}
          type="text"
          name="postalCode"
          label="Código postal"
          placeholder="Ej.: 10100"
          value={values?.postalCode}
          onChange={handleChange}
          error={errors?.postalCode}
        />
        <div className={styles.field}>
          <Shared.RadioButtons
            label="Tiene hijos dependientes?"
            options={hasChildrensOptions}
          />
        </div>
        <Form.Input
          width={4}
          type="number"
          name="childrensQty"
          label="Hijos dependientes"
          placeholder="0"
          value={values?.childrensQty}
          onChange={handleChange}
          error={errors?.childrensQty}
        />
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
