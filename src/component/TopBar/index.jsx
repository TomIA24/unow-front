import { MoreVertOutlined } from "@material-ui/icons";
import { useState } from "react";
import styles from "./styles.module.css";

const TopBarComponent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className={styles.topcontainer}>
      <div className={styles.secondcontainer}>
        {props?.items?.map((item, index) => (
          <div key={index} className={styles.buttonWrapper}>
            <button
              onClick={() => setSelectedIndex(index)}
              className={
                index === selectedIndex
                  ? index === 0
                    ? styles.selectedFirstBtnStyle
                    : index === props.items.length - 1
                    ? styles.selectedLastBtnStyle
                    : styles.selectedBtnStyle
                  : index === 0
                  ? styles.firstBtnStyle
                  : index === props.items.length - 1
                  ? styles.lastBtnStyle
                  : styles.btnStyle
              }
            >
              <div className={styles.topcontainer}>
                <p className={styles.itemstyle}>{item.title}</p>
              </div>
            </button>
            {/* Add the vertical line only if it's not the last item */}
            {index < props.items.length - 1 && (
              <div className={styles.verticalline}></div>
            )}
          </div>
        ))}
      </div>
      <button className={styles.morestyle}>
        <MoreVertOutlined />
      </button>
    </div>
  );
};

export default TopBarComponent;
