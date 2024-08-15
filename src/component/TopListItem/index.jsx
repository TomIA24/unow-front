import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import styles from "./styles.module.css"
const TopListItem = (props) => {
  return (
    <div
    className={styles.container}
    >
      {props.items.map((item, index) => {
        if (index < props.items.length - 1)
          return (
            <div className={styles.containerItem}>
              <p className={styles.textStyle}>{item.title}</p>{" "}
              <ArrowRightOutlinedIcon className={styles.arrowStyle} />
            </div>
          );
        else return <p className={styles.textStyle}>{item.title}</p>;
      })}
    </div>
  );
};
export default TopListItem;
