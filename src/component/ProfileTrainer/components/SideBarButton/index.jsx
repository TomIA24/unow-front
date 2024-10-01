import classNames from "classnames";
import styles from "./styles.module.css";

const SideBarButton = ({
  icon: Icon,
  activeSection,
  label,
  section,
  handleSectionChange,
}) => (
  <div className={styles.buttons}>
    <button
      className={classNames({ [styles.active]: activeSection === section })}
      onClick={() => handleSectionChange(section)}
    >
      <Icon sx={{ color: "white" }} />
      <span>{label}</span>
    </button>
  </div>
);

export default SideBarButton;
