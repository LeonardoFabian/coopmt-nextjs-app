import styles from "./Address.module.scss";
import { Address as AddressCtrl, Country, State, City } from "@/api";
import { useAuth } from "@/hooks";
import { Block } from "@/components/Block";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AddressItem } from "./AddressItem";
import { Shared } from "@/components/Shared";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import {
  initialValues,
  validationSchema,
} from "./AddressItem/AddressItem.form";
import { map } from "lodash";

const addressController = new AddressCtrl();
const countryController = new Country();
const stateController = new State();
const cityController = new City();

export function Address() {
  const { user } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState(null);
  const [reload, setReload] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);

  // if (!user) {
  //   return null;
  // }

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const addressesResponse = await addressController.getAll(user.id);
          console.log("USER ADDRESSES: ", addressesResponse);
          setAddresses(addressesResponse);
        } catch (error) {
          console.error("Error loading addresses: ", error);
        }
      })();
    }
  }, [reload]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const response = await countryController.find();
          console.log("COUNTRIES: ", response);
          setCountries(response.data);
        } catch (error) {
          console.error("ERROR LOADING COUNTRIES: ", error);
        }
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await stateController.findByCountry(
          selectedCountryId || countryId
        );
        console.log("STATES: ", response);
        setStates(response.data);
      } catch (error) {
        console.error("ERROR LOADING STATES: ", error);
      }
    })();
  }, [selectedCountryId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await cityController.findByState(
          selectedStateId || stateId
        );
        console.log("CITIES: ", response);
        setCities(response.data);
      } catch (error) {
        console.error("ERROR LOADING  CITIES: ", error);
      }
    })();
  }, [selectedStateId]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log(formValues);
      try {
        await addressController.create(user.id, formValues);

        // console.log("FORMULARIO ENVIADO");
        // console.log(formValues);
        // formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onReload = () => setReload((prevState) => !prevState);
  const onClose = () => setShowModal((prevState) => !prevState);

  const handleShowModal = () => setShowModal((prevState) => !prevState);

  const handleCountrySelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
    setSelectedCountryId(value);
    // console.log("SELECTED COUNTRY ID: ", selectedCountryId);
  };

  const handleStateSelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
    setSelectedStateId(value);
    // console.log("SELECTED STATE ID: ", selectedStateId);
  };

  const handleCitySelect = (e, { name, value }) => {
    formik.setFieldValue(name, value);
    setSelectedCityId(value);
    // console.log("SELECTED STATE ID: ", selectedStateId);
  };

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h6 className={styles.title}>Lista de Direcciones</h6>
            <button className="add_button" onClick={handleShowModal}>
              <span>Añadir</span>
              <Block.MaterialIcon icon="add" height="16px" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              {addresses?.data ? (
                <div className={styles.addresses}>
                  {addresses.data.map((address) => {
                    console.log(address);
                    return (
                      <AddressItem
                        key={address.id}
                        address={address}
                        onReload={onReload}
                      />
                    );
                  })}
                </div>
              ) : (
                <Shared.NoResult text="No tienes direcciones registradas." />
              )}
            </div>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Añadir Dirección"
      >
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="label"
              placeholder="Ejemplo: Casa, Trabajo, etc."
              label="Nombre del domicilio"
              onChange={formik.handleChange}
              value={formik?.values?.label}
              error={formik?.errors?.label}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              type="text"
              name="address"
              placeholder="Ejemplo: Calle 1, Calle 2, etc."
              label="Dirección"
              onChange={formik.handleChange}
              value={formik?.values?.address}
              error={formik?.errors?.address}
            />
            <Form.Input
              type="text"
              name="address2"
              placeholder="Ejemplo: Apto 1, Apto 2, etc."
              label="Apartamento, suite, etc."
              onChange={formik.handleChange}
              value={formik?.values?.address2}
              error={formik?.errors?.address2}
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
              value={formik.values.country}
              error={formik?.errors?.country}
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
              value={formik.values.state}
              error={formik?.errors?.state}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Select
              name="city"
              label="Ciudad/Municipio"
              placeholder="Selecciona"
              options={map(cities, (city) => ({
                text: `${city.attributes.name}`,
                value: city.id,
              }))}
              onChange={handleCitySelect}
              value={formik.values.city}
              error={formik?.errors?.city}
            />
            <Form.Input
              name="postalCode"
              type="text"
              label="Código Postal"
              placeholder="Introduce el código postal"
              value={formik.values.postalCode}
              error={formik?.errors?.postalCode}
              onChange={formik.handleChange}
            />
            {formik.errors.postalCode}
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
