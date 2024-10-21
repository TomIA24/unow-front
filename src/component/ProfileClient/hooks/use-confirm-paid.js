import { useCallback, useEffect, useMemo, useState } from "react";
import { request } from "../../../core/api/request";

const useConfirmPaid = ({ itemIdSelected, itemType, onClose, setCarts }) => {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const [loading, setLoading] = useState(false);
  const [preferredContact, setPreferredContact] = useState("email");
  const [contact, setContact] = useState(user?.[preferredContact] || "");

  useEffect(() => {
    if (user) {
      setContact(user?.[preferredContact]);
    }
  }, [user, preferredContact]);

  const fetchCart = useCallback(async () => {
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
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      itemId: itemIdSelected.id,
      itemType: itemType.slice(0, -1).toLowerCase()
    };

    if (preferredContact === "email") {
      data.preferredContact = "email";
      data.email = contact;
    } else if (preferredContact === "phone") {
      data.preferredContact = "phone";
      data.phone = contact;
    }

    setLoading(true);
    request.create("/order", data).then((res) => {
      fetchCart();
      onClose();
      setLoading(false);
    });
  };

  return {
    loading,
    preferredContact,
    contact,
    setPreferredContact,
    setContact,
    handleSubmit
  };
};

export default useConfirmPaid;
