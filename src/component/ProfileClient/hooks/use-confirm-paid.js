import { useEffect, useMemo, useState } from "react";
import { request } from "../../../core/api/request";

const useConfirmPaid = ({ itemIdSelected, itemType, onClose }) => {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const [loading, setLoading] = useState(false);
  const [preferredContact, setPreferredContact] = useState("email");
  const [contact, setContact] = useState(user?.[preferredContact] || "");

  useEffect(() => {
    if (user) {
      setContact(user?.[preferredContact]);
    }
  }, [user, preferredContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      itemId: itemIdSelected,
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
    request.create("/order", data).then(() => {
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
