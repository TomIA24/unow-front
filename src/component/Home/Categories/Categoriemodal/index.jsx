// Modal.js
import React from "react";
import styles from "./styles.module.css"; // Assuming you have styles defined for the modal

const Modal = ({ show, onClose, category }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h2>{category.Title}</h2>
        <p>Details about the category...</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default Modal;
