import { useField, ErrorMessage } from "formik";
import styles from "./TextArea.module.scss";
import classNames from "classnames";

export const TextArea = (props) => {
  const { label, name, placeholder } = props;
  const [field, meta] = useField(props);
  // console.log("field: ", field);
  // console.log("meta: ", meta);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        name={name}
        rows={3}
        placeholder={placeholder}
        className={classNames(styles.input, {
          [styles.error]: meta?.touched && meta?.error,
          [styles.success]: meta?.value && !meta?.error,
        })}
        {...field}
        {...props}
      ></textarea>
      <ErrorMessage name={name} component="span" className="custom-error" />
      {/* {meta?.touched && meta?.error && (
        <span className="error">{meta.error}</span>
      )} */}
    </>
  );
};
