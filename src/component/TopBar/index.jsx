import { MoreVertOutlined } from "@material-ui/icons";
import { useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import styles from "./styles.module.css";

const TopBarComponent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [expand, setExpand] = useState(false);
  const { isLargeScreen, isMediumScreen, isSmallScreen } = useScreenSize();

  const renderButton = (item, index, maxIndex) => (
    <div key={index} className={styles.buttonWrapper}>
      <button
        onClick={() => setSelectedIndex(index)}
        className={
          index === selectedIndex
            ? index === 0
              ? styles.selectedFirstBtnStyle
              : index === maxIndex
              ? styles.selectedLastBtnStyle
              : styles.selectedBtnStyle
            : index === 0
            ? styles.firstBtnStyle
            : index === maxIndex
            ? styles.lastBtnStyle
            : styles.btnStyle
        }
      >
        <div className={styles.topcontainer}>
          <p className={styles.itemstyle}>{item.title}</p>
        </div>
      </button>
      {index < maxIndex && <div className={styles.verticalline}></div>}
    </div>
  );

  const renderButtonsForScreen = () => {
    if (isLargeScreen)
      return props?.items
        ?.slice(0, 6)
        ?.map((item, index) => renderButton(item, index, 5));
    if (isMediumScreen)
      return props?.items
        ?.slice(0, 3)
        ?.map((item, index) => renderButton(item, index, 2));
    if (isSmallScreen)
      return props?.items
        ?.slice(0, 2)
        ?.map((item, index) => renderButton(item, index, 1));
  };

  const ListItems = ({ items }) => (
    <div className={styles.topListItemsContainer}>
      <div className={styles.itemContainer}>
        {items?.map((item, index) => (
          <p key={index} className={styles.itemContainer}>
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );

  const handleExpandToggle = () => setExpand(!expand);

  const renderExpandedItems = () => {
    if (!expand) return null;

    if (isLargeScreen) return <ListItems items={props?.items?.slice(5)} />;
    if (isMediumScreen) return <ListItems items={props?.items?.slice(2)} />;
    if (isSmallScreen) return <ListItems items={props?.items?.slice(1)} />;
  };

  return (
    <div>
      <div className={styles.topcontainer}>
        <div className={styles.secondcontainer}>{renderButtonsForScreen()}</div>
        <button onClick={handleExpandToggle} className={styles.morestyle}>
          <MoreVertOutlined />
        </button>
      </div>
      {renderExpandedItems()}
    </div>
  );
};

export default TopBarComponent;
