import styles from "./FieldRenderer.module.scss";
import React from "react";
import {
  Form,
  FormInput,
  FormSelect,
  Radio,
  FormField,
  Message,
} from "semantic-ui-react";
import { Field, ErrorMessage } from "formik";
import { TextInput, TextArea, Checkbox, Select } from "../Fields";

export function FieldRenderer(props) {
  const { field, name } = props;
  // console.log("FieldRenderer props: ", formik);
  switch (field.type) {
    case "string":
      return (
        <div className="field">
          <TextInput name={name ? name : field?.name} label={field?.label} />
          {/* <label htmlFor={field.name}>{field.label}</label>
          <Field name={field.name} type="text" />
          <ErrorMessage name={field.name} component="span" /> */}
        </div>
      );
      break;
    case "text":
      return (
        <div className="field">
          <TextArea name={name ? name : field?.name} label={field?.label} />
          {/* <label htmlFor={field.name}>{field.label}</label>
          <Field name={field.name} as="textarea" rows="3" />
          <ErrorMessage name={field.name} component="span" /> */}
        </div>
      );
      break;
    case "email":
      return (
        <div className="field">
          <TextInput
            name={name ? name : field?.name}
            label={field?.label}
            type="email"
          />
          {/* <label htmlFor={field.name}>{field.label}</label>
          <Field name={field.name} type="email" />
          <ErrorMessage name={field.name} component="span" /> */}
        </div>
      );
      break;
    case "integer":
    case "decimal":
      return (
        <div className="field">
          <TextInput
            name={name ? name : field?.name}
            label={field.label}
            type="number"
          />
          {/* <label htmlFor={field.name}>{field.label}</label>
          <Field name={field.name} type="number" />
          <ErrorMessage name={field.name} component="span" /> */}
        </div>
      );
      break;
    case "date":
      return (
        <div className="field">
          <TextInput
            name={name ? name : field?.name}
            label={field.label}
            type="date"
          />
          {/* <label htmlFor={field.name}>{field.label}</label>
          <Field name={field.name} type="date" />
          <ErrorMessage name={field.name} component="span" /> */}
        </div>
      );
      break;

    case "relation":
      return (
        <div className="field">
          <Select
            name={name ? name : field?.name}
            label={field.label}
            readOnly={field.readOnly}
            disabled={field.disabled}
          >
            {field?.options?.map((option) => (
              <option value={option.value}>{option.text}</option>
            ))}
          </Select>
          {/* <label htmlFor={field.name}>{field.label}</label>
          <Field
            name={field.name}
            as="select"
            readOnly={field.readOnly}
            disabled={field.disabled}
          >
            {field?.options?.map((option) => (
              <option value={option.value}>{option.text}</option>
            ))}
          </Field>
          <ErrorMessage name={field.name} component="span" /> */}
        </div>
      );
      break;
    case "boolean":
      return (
        <div className="field">
          <Checkbox name={name ? name : field?.name} label={field.label} />

          {/* <label>
            <Field name={field.name} type="checkbox" />
            {field.label}
          </label>
          <ErrorMessage name={field.name} component="span" /> */}

          {/* <Form.Field>
            <label>{field.label}</label>
            <Form.Group widths="equal">
              <Form.Field>
                <Radio
                  label="NO"
                  name={name}
                  value={false}
                  checked={value === false}
                  onChange={(e, data) => setFieldValue(name, data?.value)}
                  // onChange={(e, { value }) =>
                  //   formik?.setFieldValue(name, value)
                  // }
                  error={errors[name] ? { content: errors[name] } : null}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="SI"
                  name={name}
                  value={true}
                  checked={value === true}
                  onChange={(e, data) => setFieldValue(name, data?.value)}
                  // onChange={(e, { value }) =>
                  //   formik?.setFieldValue(name, value)
                  // }
                  error={errors[name] ? { content: errors[name] } : null}
                />
              </Form.Field>
            </Form.Group>
          </Form.Field> */}
        </div>
      );
    default:
      break;
  }
}
