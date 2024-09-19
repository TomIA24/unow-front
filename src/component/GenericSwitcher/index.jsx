import { Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const GenericSwitcher = (props) => {
  const {
    id: categoryId,
    categoryName: formattedTitle,
    contentType,
  } = useParams();
  const content = contentType === "courses" ? "trainings" : "courses";
  return (
    <Link to={`/categoryCourses/${categoryId}/${formattedTitle}/${content}`}>
      <Box sx={{ display: "flex" }}>
        {props?.items.map((item, i) => {
          return (
            <button
              className={`${styles.btnstyle} ${
                props.selectedItem === item.title
                  ? styles.btnselectedstyle
                  : null
              }`}
              onClick={() => props.setSelectedItem(item.title)}
            >
              <img className={styles.image} src={item.icon} alt="" />

              <p className={styles.textstyle}>{item.title}</p>
            </button>
          );
        })}
      </Box>
    </Link>
  );
};
export default GenericSwitcher;
