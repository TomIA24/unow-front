import {
  AddTwoTone,
  PlusOneOutlined,
  StarOutline,
  StarRounded,
} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import styles from "../../../../Main/styles.module.css";
import stylesItem from "./styles.modules.css";
const CourseItem = (props) => {
  return (
    <div>
    <div
      className={styles.topTrainingElements}
    >
      <div className={styles.inner_carousel} >
        {props.course.thumbnail ? (
          <div
            className={styles.image}
            style={{ marginBottom: "1%" }}
          >
            <img
              src={props.course.thumbnail}
              alt={""}
              style={{height:"100%"}}
              className={styles.imagefeatures}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <img
              src="default-image.png"
              alt="Default"
              className={styles.imagefeatures}
            />
          </div>
        )}
        <div
          style={{
            width: "100%",
            margin: "1px 3px 0px 3px",
            display: "inline-block",
          }}
        >
          <div className={styles.categorie} >
            <div className={styles.categorietype}>
              {props.course.subcat}
            </div>
            <div
              className={styles.categoriprice}
              style={{margin: "0px 15px 0px 0px"}}
             
            >
              {props.course.price}{" "}
            </div>
          </div>
          <div style={{ display: "inline-block", float: "left" }}>
            <div
              className={styles.categoriniveau}
              style={{ marginTop: "8px", fontSize: "15px" }}
            >
              {props.course.level}
            </div>
            <div
              className={styles.categoridomain}
              style={{ marginTop: "8px", fontSize: "15px" }}
            >
              {props.course.title}
            </div>
          </div>
          <br />
          <div
            style={{
              display: "inline-flex",
              float: "left",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div
              className={styles.categoriniveau}
              style={{
                marginTop: "20px",
                float: "left",
                display: "flex",
                fontSize:"13px",
                alignItems: "center",
              }}
            >
              <StarRounded style={{ color: "yellow" }} />5 (750)
            </div>
            <div
              className={styles.categoridomain}
              style={{
                marginTop: "20px",
                float: "right",
                margin: "0px 15px 15px 0px ",
              }}
            >
              {props.course.title}
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              float: "right",
              backgroundColor: "#cd6214",
              borderRadius: "15px 0px 0px",
              cursor: "pointer",
            }}
          >
            <AddIcon  />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default CourseItem;
