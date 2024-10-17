import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useMemo, useState } from "react";
import Button from "../../../shared/components/button";
import imageCourse from "../../assets/icon_course.svg";
import imageTraining from "../../assets/icon_training.svg";
import imageVoucher from "../../assets/icon_voucher.svg";
import GenericSwitcher from "../../GenericSwitcher";
import useCart from "../hooks/use-cart";
import styles from "./styles.module.css";

const Cart = ({ user }) => {
  const {
    data,
    cart,
    loading,
    isCoursesLoading,
    isTrainingsLoading,
    handleCourse,
    handleTraining,
    handleBuySTRIPE
  } = useCart();
  const [selectedType, setSelectedType] = useState("COURSES");

  const items = useMemo(() => {
    return [
      {
        icon: imageCourse,
        title: "COURSES",
        count: cart?.courses?.length || 0,
        width: "32px"
      },
      {
        icon: imageTraining,
        title: "TRAININGS",
        count: cart?.trainings?.length,
        width: "37px"
      },
      {
        icon: imageVoucher,
        count: cart?.vouchers?.length || 0,
        title: "VOUCHERS",
        width: "44px"
      }
    ];
  }, [cart]);
  console.log(cart);

  return (
    <div className={styles.leftSectionProfile}>
      <div className={styles.container}>
        <GenericSwitcher
          items={items}
          selectedItem={selectedType}
          setSelectedItem={setSelectedType}
          path={"/candidate/profile"}
        />

        <div className={styles.content}>
          {cart?.[selectedType.toLowerCase()]?.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
