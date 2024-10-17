import React, { useMemo, useState } from "react";
import EmptyBox from "../../../shared/components/EmptyBox";
import imageCourse from "../../assets/icon_course.svg";
import imageTraining from "../../assets/icon_training.svg";
import imageVoucher from "../../assets/icon_voucher.svg";
import GenericSwitcher from "../../GenericSwitcher";
import CartCard from "../components/CartCard";
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
          {cart?.[selectedType.toLowerCase()]?.length === 0 && (
            <EmptyBox text="Nothing to see here" />
          )}
          {cart?.[selectedType.toLowerCase()]?.map((item) => (
            <CartCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
