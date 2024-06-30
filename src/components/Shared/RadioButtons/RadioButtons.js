import styles from "./RadioButtons.module.scss";
import { useState } from "react";
import { map } from "lodash";
import classNames from "classnames";

export function RadioButtons(props) {
  const { label, options } = props;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("hasChildrens: ", selectedOption);
  };

  return (
    <div className="field">
      <label>{label}</label>
      <div className="input">
        {map(options, (option) => (
          <div key={option.value} className={styles.radio}>
            <label htmlFor={option.value}>
              <span>{option.label}</span>
              <input
                type="radio"
                id={option.value}
                name={option.name}
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
                className={classNames(styles.radio, {
                  [styles.checked]: selectedOption === option.value,
                })}
              />
              <span
                className={classNames(styles.checkmark, {
                  [styles.checkmarked]: selectedOption === option.value,
                })}
              ></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
