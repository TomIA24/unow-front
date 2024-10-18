import { useEffect, useMemo, useState } from "react";
import { request } from "../../../core/api/request";

const useCart = () => {
  const [selectedType, setSelectedType] = useState("COURSES");
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState({
    courses: [],
    trainings: [],
    vouchers: []
  });

  useEffect(() => {
    request.list("cart").then((data) => {
      const vouchers = data.cartItems.filter((item) => item.type === "voucher");
      const courses = data.cartItems.filter((item) => item.type === "course");
      const trainings = data.cartItems.filter(
        (item) => item.type === "training"
      );

      setCarts({
        courses,
        trainings,
        vouchers
      });
    });
  }, []);

  const items = useMemo(() => {
    return [
      {
        icon: "/path/to/imageCourse",
        title: "COURSES",
        count: carts?.courses?.length || 0,
        width: "32px"
      },
      {
        icon: "/path/to/imageTraining",
        title: "TRAININGS",
        count: carts?.trainings?.length || 0,
        width: "37px"
      },
      {
        icon: "/path/to/imageVoucher",
        count: carts?.vouchers?.length || 0,
        title: "VOUCHERS",
        width: "44px"
      }
    ];
  }, [carts]);

  const handleDelete = (id) => {
    setLoading(true);
    request.remove("/cart", id).then(() => {
      setCarts({
        ...carts,
        [selectedType.toLowerCase()]: carts[selectedType.toLowerCase()].filter(
          (item) => item._id !== id
        )
      });
      setLoading(false);
    });
  };

  return {
    carts,
    selectedType,
    setSelectedType,
    loading,
    items,
    handleDelete
  };
};

export default useCart;
