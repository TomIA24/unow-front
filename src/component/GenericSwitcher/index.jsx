import { Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const GenericSwitcher = ({
  items,
  selectedItem,
  setSelectedItem,
  indicator
}) => {
  const { id, contentType } = useParams();
  const content = contentType === "courses" ? "trainings" : "courses";

  return (
    <Link to={`/category/${id}/${content}`}>
      <Box sx={{ display: "flex" }}>
        {items.map((item, i) => {
          return (
            <button
              key={i}
              className={`${styles.btnstyle} ${
                selectedItem === item.title ? styles.btnselectedstyle : null
              }`}
              onClick={() => setSelectedItem(item.title)}
            >
              <img
                className={styles.image}
                src={item.icon}
                width={item.width}
                alt=""
              />

              <p className={styles.textstyle}>{item.title}</p>
              {indicator && <p className={styles.indicator}> {indicator}</p>}
            </button>
          );
        })}
      </Box>
    </Link>
  );
};
export default GenericSwitcher;
