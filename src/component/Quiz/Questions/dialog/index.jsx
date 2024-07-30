import React from 'react';
import styles from './styles.module.css'; // Create styles for the dialog

const Dialog = ({ onClose, questions }) => {
    return (
      <div className={styles.dialogOverlay}>
        <div className={styles.dialogContent}>
          <button onClick={onClose} className={styles.closeButton}>Close</button>
          <div>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={index} className={styles.question}>
                  <p>{question.question}</p>
                </div>
              ))
            ) : (
              <p>No questions available.</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Dialog;