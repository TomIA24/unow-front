import styles from "./styles.module.css";

const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  style,
  value,
  onChange,
  onClick,
  required,
}) => {
  return (
    <div className={styles.inputContainer} onClick={onClick}>
      <label>{label}</label>
      <input
        style={style}
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
