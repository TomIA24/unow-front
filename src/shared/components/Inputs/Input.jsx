import styles from "./styles.module.css";

const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  onClick,
  required,
}) => {
  return (
    <div className={styles.inputContainer} onClick={onClick}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
