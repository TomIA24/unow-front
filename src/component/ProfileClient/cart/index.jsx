import React, { useState } from "react";
import EmptyBox from "../../../shared/components/EmptyBox";
import GenericSwitcher from "../../GenericSwitcher";
import CartCard from "../components/CartCard";
import ConfirmPaidModal from "../components/ConfirmPaidModal";
import useCart from "../hooks/use-cart";
import styles from "./styles.module.css";

const Cart = () => {
  const {
    carts,
    setCarts,
    selectedType,
    setSelectedType,
    loading,
    items,
    handleDelete
  } = useCart();

  const [openModal, setOpenModal] = useState(false);
  const [itemIdSelected, setItemIdSelected] = useState({
    id: null,
    isFree: false
  });

  const onClose = () => {
    setOpenModal(false);
    setItemIdSelected({
      id: null,
      isFree: false
    });
  };

  const handlePaid = (id, price) => {
    setItemIdSelected({
      id,
      isFree: parseInt(price) === 0
    });
    setOpenModal(true);
  };

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
          {carts?.[selectedType.toLowerCase()]?.length === 0 && (
            <EmptyBox text="Nothing to see here" />
          )}
          {carts?.[selectedType.toLowerCase()]?.map((item) => (
            <CartCard
              key={item._id}
              itemId={item._id}
              id={item.item?._id}
              title={item.item?.Title}
              thumbnail={item.item?.Thumbnail}
              price={item.item?.Price}
              category={item.item?.Category}
              level={item.item?.Level}
              status={item.status}
              loading={loading}
              handleDelete={handleDelete}
              handlePaid={handlePaid}
            />
          ))}
        </div>
      </div>
      <ConfirmPaidModal
        open={openModal}
        onClose={onClose}
        setCarts={setCarts}
        itemType={selectedType}
        itemIdSelected={itemIdSelected}
      />
    </div>
  );
};

export default Cart;
