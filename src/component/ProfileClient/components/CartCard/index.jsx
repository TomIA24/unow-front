import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import Button from "../../../../shared/components/button";
import styles from "./styles.module.css";

const CartCard = ({ item }) => {
  return (
    <div>
      <div key={item._id} className={styles.card}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={`${process.env.REACT_APP_API}${item.Thumbnail.filePath}`}
            alt="cart item"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.group}>
            <p className={styles.title}>Web development</p>
            <div className={styles.price}>{item.Price || 0}$</div>
          </div>
          <div className={styles.textContainer}>
            <p>Intermediate</p>
            <p
              className={styles.status}
              style={{ "--status-color": "#34A853" }}
            >
              progress
            </p>
            <p>React: Developing a Web Application</p>
          </div>

          <div className={styles.box}>
            <p>⭐4.7</p>
            <div className={styles.buttons}>
              <Button
                varaint="outline"
                text="Delete"
                className={styles.btn}
                leftIcon={<DeleteOutlineIcon sx={{ fontSize: "17px" }} />}
                onClick={() => {}}
              />
              <Button
                text="Pay Now"
                className={styles.btn}
                leftIcon={<AddCardIcon sx={{ fontSize: "17px" }} />}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
