import styles from "./AddressItem.module.scss";
import { Button } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { useState, useEffect } from "react";
import { Address, Country, State, City } from "@/api";
import { Block } from "@/components/Block";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./AddressItem.form";
// import { useAuth } from "@/hooks";
import { map } from "lodash";
import { User } from "@/api";

const addressController = new Address();
const countryController = new Country();
const stateController = new State();
const cityController = new City();
const userController = new User();

export function AddressItem(props) {
  const { address, onReload, reload, updateUser } = props;
  console.log(address);
  // const { user } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getMe();
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [reload]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(
    address?.country?.data.id || null
  );
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(
    address?.state?.data.id || null
  );
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(
    address?.city?.data.id || null
  );

  const label = address?.attributes?.label || "";
  const address1 = address?.attributes?.address || "";
  const address2 = address?.attributes?.address2 || "";
  const city = address?.attributes?.city.data;
  const cityId = city?.id;
  const cityName = city?.attributes?.name || "";
  const state = address?.attributes?.state?.data;
  const stateId = state?.id;
  const stateName = state?.attributes?.name || "";
  const country = address?.attributes?.country?.data;
  const countryId = country?.id;
  const countryName = country?.attributes?.name || "";
  const postalCode = address?.attributes?.postalCode || "";

  const formattedAddress = `${address1}, ${address2 ? address2 + "," : ""} ${
    cityName ? cityName + "," : ""
  } ${stateName ? stateName + "," : ""} ${
    countryName ? countryName + "," : ""
  } ${postalCode}`;

  useEffect(() => {
    (async () => {
      try {
        const response = await countryController.find();
        console.log("COUNTRIES: ", response);
        setCountries(response.data);
      } catch (error) {
        console.error("ERROR LOADING COUNTRIES: ", error);
      }
    })();
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
  }, [selectedCountryId, countryId]);

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
  }, [selectedStateId, stateId]);

  const formik = useFormik({
    initialValues: initialValues(
      label,
      address1,
      address2,
      cityId,
      stateId,
      countryId,
      postalCode
    ),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log(formValues);
      try {
        if (address.id) {
          await addressController.update(address.id, formValues);
          // console.log("Actualizar direccion!");
        } else {
          await addressController.create(user.id, formValues);
        }
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

  const onClose = () => {
    setShowModal(false);
  };
  const handleShowModal = () => setShowModal((prevState) => !prevState);
  const handleShowConfirm = () => setShowConfirm((prevState) => !prevState);

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

  const deleteOnConfirm = async () => {
    try {
      await addressController.delete(address.id);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      await userController.updateMe(user.id, {
        defaultAddress: addressId,
      });
      updateUser("defaultAddress", addressId);
      onReload();
    } catch (error) {
      console.error("Error setting default address: ", error);
    }
  };

  const showButton = user?.defaultAddress?.id !== address?.id ? true : false;
  console.log("Show BTN: ", showButton);

  return (
    <>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <div className={styles.header}>
                <h6 className={styles.title}>{label}</h6>
                {user?.defaultAddress?.id == address?.id ? (
                  <span>
                    Domicilio actual{" "}
                    <Block.MaterialIcon icon="star" height="13px" />
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.address}>
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
                {showButton && (
                  <button
                    className="default_button"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    Establecer como predeterminada
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Shared.AppModal
        show={showModal}
        onClose={onClose}
        title="Editar domicilio"
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
        onCancel={handleShowConfirm}
        onConfirm={deleteOnConfirm}
        content="¿Deseas eliminar este domicilio?"
      />
    </>
  );
}
