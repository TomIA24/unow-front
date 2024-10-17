import { Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const GenericSwitcher = ({ items, selectedItem, setSelectedItem, path }) => {
  const { id } = useParams();

  const returnPath = (item) => {
    return path ? path : `/category/${id}/${item.title.toLowerCase()}`;
  };

  return (
    <Box sx={{ display: "flex" }}>
      {items.map((item, i) => {
        return (
          <button key={i} onClick={() => setSelectedItem(item.title)}>
            <Link
              className={`${styles.btnstyle} ${
                selectedItem === item.title ? styles.btnselectedstyle : null
              }`}
              to={returnPath(item)}
            >
              <img
                className={styles.image}
                src={item.icon}
                width={item.width}
                alt=""
              />

              <p className={styles.textstyle}>{item.title}</p>
              <p className={styles.indicator}> {item.count}</p>
            </Link>
          </button>
        );
      })}
    </Box>
  );
};

export default GenericSwitcher;
