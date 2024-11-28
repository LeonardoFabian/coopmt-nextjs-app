import { useField, ErrorMessage } from "formik";
import styles from "./Checkbox.module.scss";
import classNames from "classnames";

export const Checkbox = (props) => {
  const { label, name, placeholder } = props;
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <>
      <label>
        <input
          type="checkbox"
          {...field}
          {...props}
          className={classNames(styles.input, {
            [styles.error]: meta?.touched && meta?.error,
            [styles.success]: meta?.value && !meta?.error,
          })}
        />
        {label}
      </label>
      <ErrorMessage name={name} component="span" className="custom-error" />
      {/* {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )} */}
    </>
  );
};
