import { MoreVertOutlined } from "@material-ui/icons";
import { useState,useEffect } from "react";
import styles from "./styles.module.css";

const TopBarComponent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [expand,setExpand]=useState(false)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const ListItems=(props)=>{
    return(<div className={styles.topListItemsContainer}>
            <div className={styles.itemContainer}>
              {props.items?.map((item)=>(
              <p className={styles.itemContainer}>{item.title}</p>))
              }
              </div>
        </div>)
  }
  return (
    <div>
    <div className={styles.topcontainer}>
      <div className={styles.secondcontainer}>
        {windowWidth>=1320?props?.items?.slice(0,6)?.map((item, index) => (
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
        )):windowWidth>750&&windowWidth<1320?props?.items?.slice(0,3)?.map((item, index) => (
          <div key={index} className={styles.buttonWrapper}>
            <button
              onClick={() => setSelectedIndex(index)}
              className={
                index === selectedIndex
                  ? index === 0
                    ? styles.selectedFirstBtnStyle
                    : index === 2
                    ? styles.selectedLastBtnStyle
                    : styles.selectedBtnStyle
                  : index === 0
                  ? styles.firstBtnStyle
                  : index === 2
                  ? styles.lastBtnStyle
                  : styles.btnStyle
              }
            >
              <div className={styles.topcontainer}>
                <p className={styles.itemstyle}>{item.title}</p>
              </div>
            </button>
            {/* Add the vertical line only if it's not the last item */}
            {index < 2  && (
              <div className={styles.verticalline}></div>
            )}
          </div>
        )):
        windowWidth<=750&&props?.items?.slice(0,2)?.map((item, index) => (
          <div key={index} className={styles.buttonWrapper}>
            <button
              onClick={() => setSelectedIndex(index)}
              className={
                index === selectedIndex
                  ? index === 0
                    ? styles.selectedFirstBtnStyle
                    : index === 1
                    ? styles.selectedLastBtnStyle
                    : styles.selectedBtnStyle
                  : index === 0
                  ? styles.firstBtnStyle
                  : index === 1
                  ? styles.lastBtnStyle
                  : styles.btnStyle
              }
            >
              <div className={styles.topcontainer}>
                <p className={styles.itemstyle}>{item.title}</p>
              </div>
            </button>
            {/* Add the vertical line only if it's not the last item */}
            {index < 1  && (
              <div className={styles.verticalline}></div>
            )}
          </div>
        ))}
      </div>
      <button onClick={()=>setExpand(!expand)} className={styles.morestyle}>
        <MoreVertOutlined />
      </button>
  

    </div>
          {expand?windowWidth>=1320?<ListItems items={props?.items?.slice(5,props?.items?.length)} />:windowWidth>750&&windowWidth<1320?<ListItems items={props?.items?.slice(2,props?.items?.length)} />:windowWidth<=750&&<ListItems items={props?.items?.slice(1,props?.items?.length)} />:<></>}
          </div>
  );
};

export default TopBarComponent;
