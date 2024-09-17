import { Box } from "@mui/material";
import styles from "./styles.module.css";
const GenericSwitcher = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      {props?.items.map((item, i) => {
        return (
          <button
            className={`${styles.btnstyle} ${
              props.selectedItem === item.title ? styles.btnselectedstyle : null
            }`}
            onClick={() => props.setSelectedItem(item.title)}
          >
            <img className={styles.image} src={item.icon} alt="" />

            <p className={styles.textstyle}>{item.title}</p>
          </button>
        );
      })}
    </Box>
  );
};
export default GenericSwitcher;
