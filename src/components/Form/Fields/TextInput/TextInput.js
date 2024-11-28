import { useField, ErrorMessage } from "formik";
import styles from "./TextInput.module.scss";
import classNames from "classnames";

export const TextInput = (props) => {
  const { label, name, type, placeholder } = props;
  const [field, meta] = useField(props);
  // console.log("field: ", field);
  // console.log("meta: ", meta);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={classNames(styles.input, {
          [styles.error]: meta?.touched && meta?.error,
          [styles.success]: meta?.value && !meta?.error,
        })}
        {...field}
        {...props}
      />
      <ErrorMessage name={name} component="span" className="custom-error" />
      {/* {meta?.touched && meta?.error && (
        <span className="error">{meta.error}</span>
      )} */}
    </>
  );
};
