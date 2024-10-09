import styles from "./styles.module.css";

const Select = ({
  label,
  name,
  options,
  value,
  categoryRef,
  onChange,
  required,
  style,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <select
        style={style}
        ref={categoryRef}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
