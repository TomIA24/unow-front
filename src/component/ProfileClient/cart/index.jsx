import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
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

  return (
    <div className={styles.leftSectionProfile}>
      <div className={styles.container}>
        <GenericSwitcher
          items={[
            { icon: imageCourse, title: "COURSES", width: "32px" },
            { icon: imageTraining, title: "TRAININGS", width: "37px" },
            { icon: imageVoucher, title: "VOUCHERS", width: "44px" }
          ]}
          selectedItem={selectedType}
          setSelectedItem={setSelectedType}
          indicator={5}
        />

        <div className={styles.content}>
          {cart?.trainings?.map((course) => (
            <div key={course._id} className={styles.card}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.img}
                  src={"images/welcome/welcome.png"}
                  alt="cart item"
                />
              </div>

              <div className={styles.info}>
                <div className={styles.group}>
                  <p className={styles.title}>Web development</p>
                  <div className={styles.price}>160$</div>
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
