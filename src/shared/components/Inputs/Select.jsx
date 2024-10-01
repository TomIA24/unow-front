import styles from "./styles.module.css";

const Select = ({ label, name, options, value, onChange, required }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange} required={required}>
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
