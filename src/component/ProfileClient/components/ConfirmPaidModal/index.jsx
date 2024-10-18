import React from "react";
import Button from "../../../../shared/components/button";
import Input from "../../../../shared/components/Inputs/Input";
import useConfirmPaid from "../../hooks/use-confirm-paid";
import styles from "./styles.module.css";

const ConfirmPaidModal = ({ onClose, open, itemType, itemIdSelected }) => {
  const {
    loading,
    preferredContact,
    contact,
    setPreferredContact,
    setContact,
    handleSubmit
  } = useConfirmPaid({ itemIdSelected, itemType, onClose });

  return (
    open && (
      <div className={styles.modal}>
        <div className={styles.container}>
          <button onClick={onClose} className={styles.closeButton}>
            X
          </button>
          <div className={styles.content}>
            <h2>
              What an excellent choice <span>!</span>
            </h2>
            <p>Thank you for your confidence.</p>
            <p>Could you confirm the contact method you prefer?</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.radioContainer}>
              <div>
                <input
                  type="radio"
                  id="contactChoice1"
                  name="contact"
                  value="email"
                  checked={preferredContact === "email"}
                  onChange={(e) => setPreferredContact(e.target.value)}
                />
                <label htmlFor="contactChoice1">Email</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="contactChoice2"
                  name="contact"
                  value="phone"
                  checked={preferredContact === "phone"}
                  onChange={(e) => setPreferredContact(e.target.value)}
                />
                <label htmlFor="contactChoice2">Phone</label>
              </div>
            </div>
            <Input
              style={{ height: "20px", borderColor: "var(--primary-color)" }}
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <Button type="submit" text="Send" loading={loading} />
          </form>
        </div>
      </div>
    )
  );
};

export default ConfirmPaidModal;
