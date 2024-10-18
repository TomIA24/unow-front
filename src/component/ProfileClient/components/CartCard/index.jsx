import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import Button from "../../../../shared/components/button";
import styles from "./styles.module.css";

const statusColor = {
  pending: "#FFC107",
  progress: "#34A853"
};

const CartCard = ({
  id,
  title,
  thumbnail,
  price,
  level,
  category,
  status,
  handleDelete,
  loading,
  handlePaid
}) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={`${process.env.REACT_APP_API}${thumbnail.filePath}`}
            alt="cart item"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.group}>
            <p className={styles.title}>{category}</p>
            <div className={styles.price}>{price || 0}$</div>
          </div>
          <div className={styles.textContainer}>
            <p>{level}</p>
            <p
              className={styles.status}
              style={{ "--status-color": statusColor[status] }}
            >
              {status}
            </p>
            <p>{title}</p>
          </div>

          <div className={styles.box}>
            <p>⭐4.7</p>
            <div className={styles.buttons}>
              <Button
                varaint="outline"
                text="Delete"
                loading={loading}
                className={styles.btn}
                leftIcon={<DeleteOutlineIcon sx={{ fontSize: "17px" }} />}
                onClick={() => handleDelete(id)}
              />
              <Button
                text="Pay Now"
                className={styles.btn}
                leftIcon={<AddCardIcon sx={{ fontSize: "17px" }} />}
                onClick={() => handlePaid(id, price)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
