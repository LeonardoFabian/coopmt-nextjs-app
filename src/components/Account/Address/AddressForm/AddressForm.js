import styles from './AddressForm.module.scss';
import { Form, Icon } from 'semantic-ui-react';
import { initialValues, validationSchema } from './AddressForm.form';
import { useFormik, ErrorMessage } from 'formik';
import { Address, Country, State, City } from '@/api';
import { useAuth } from '@/hooks';
import { useState, useEffect } from 'react';
import { map } from 'lodash';

const addressController = new Address();
const countryController = new Country();
const stateController = new State();
const cityController = new City();

export function AddressForm(props) {

    const { user } = useAuth();
    const { onClose, onReload, addressId, address } = props;

    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState(address?.country?.data.id || null);
    const [states, setStates] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState(address?.state?.data.id || null);
    const [cities, setCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(address?.city?.data.id || null);

    useEffect(() => {
        (async () => {
            try {
                const response = await countryController.find();
                console.log("COUNTRIES: ", response);
                setCountries(response.data);
            } catch (error) {
                console.error("ERROR LOADING COUNTRIES: ", error);                
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            try {   
                const response = await stateController.findByCountry(selectedCountryId);
                console.log("STATES: ", response);
                setStates(response.data);
            } catch (error) {
                console.error("ERROR LOADING STATES: ", error);
            }
        })()
    }, [selectedCountryId]);

    useEffect(() => {
        (async () => {
            try {
                const response = await cityController.findByState(selectedStateId);
                console.log("CITIES: ", response);
                setCities(response.data);
            } catch (error) {
                console.error("ERROR LOADING  CITIES: ", error);
            }
        })()
    }, [selectedStateId]);

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                if(addressId) {
                    await addressController.update(addressId, formValues);
                    // console.log("Actualizar direccion!");
                } else {
                    await addressController.create(user.id, formValues);
                }
                // console.log("FORMULARIO ENVIADO");
                // console.log(formValues);
                formik.handleReset();
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    });   

    const handleCountrySelect = (e, {name, value}) => {
        formik.setFieldValue(name, value);
        setSelectedCountryId(value);
        console.log("SELECTED COUNTRY ID: ", selectedCountryId );
    }

    const handleStateSelect = (e, {name, value}) => {
        formik.setFieldValue(name, value);
        setSelectedStateId(value);
        console.log("SELECTED STATE ID: ", selectedStateId );
    }

    const handleCitySelect = (e, {name, value}) => {
        formik.setFieldValue(name, value);
        setSelectedCityId(value);
        console.log("SELECTED STATE ID: ", selectedStateId );
    }

    return (
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="address"
                type='text'
                label="Dirección"
                placeholder="Calle/Ave, número de casa, sector"
                value={formik.values.address}
                error={formik.errors.address}
                onChange={formik.handleChange}

            />
            <Form.Input 
                name="address2"
                type='text'
                label="Dirección linea 2 (opcional)"
                placeholder="Manz/Apto/Municipio"
                value={formik.values.address2}
                error={formik.errors.address2}
                onChange={formik.handleChange}
            />

            <Form.Group widths="equal">
                <Form.Select 
                    name="country"
                    label="País"
                    placeholder="Selecciona tu país"
                    options={
                        map(countries, (country) => (
                            { text: `${country.attributes.name}`, value: country.id } 
                        ))
                    }
                    onChange={handleCountrySelect}
                    value={formik.values.country}
                />
                <Form.Select 
                    name="state"
                    label="Estado/Provincia"
                    placeholder="Selecciona"
                    options={
                        map(states, (state) => (
                            {text: `${state.attributes.name}`, value: state.id }
                        ))
                    }
                    onChange={handleStateSelect}
                    value={formik.values.state}
                />       
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Select 
                    name="city"
                    label="Ciudad/Municipio"
                    placeholder="Selecciona"
                    options={
                        map(cities, (city) => (
                            {text: `${city.attributes.name}`, value: city.id }
                        ))
                    }
                    onChange={handleCitySelect}
                    value={formik.values.city}
                />
                <Form.Input 
                    name="postalCode"
                    type='text'
                    label="Código Postal"
                    placeholder="Introduce el código postal"
                    value={formik.values.postalCode}
                    error={formik.errors.postalCode}
                    onChange={formik.handleChange}
                />
                {formik.errors.postalCode}
            </Form.Group>

            <div className={styles.actions}>
                <Form.Button type='submit' loading={formik.isSubmitting}>
                    <Icon name="save" /> Enviar
                </Form.Button>  
            </div>   
        </Form>
    )
}
