import React, { useState, useEffect } from "react";
import styles from "./styles.module.css"; // Create styles for the dialog
import axios from "axios";

const Dialog = ({ onClose, questions }) => {
  const [flags, setFlags] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handleFlagQuestion = async questionIndex => {
    const questionId = questions[questionIndex]._id;
    const updatedFlags = [...flags];
    updatedFlags[questionIndex] = !updatedFlags[questionIndex];
    setFlags(updatedFlags);

    // Update the flag status in the backend
    try {
      await axios.put(`http://localhost:5050/api/quiz/api/mark/${questionId}`, {
        flag: updatedFlags[questionIndex]
      });
    } catch (error) {
      console.error("Error updating flag status:", error);
    }
  };
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogContentInner}>
        <div className={styles.menudialog}>
          <button className={styles.bookmark}>ALL QUESTIONS</button>  <button className={styles.bookmark}>
            {" "}<img
              src="./images/quiz/dialog/flag.png"
              alt="Flag Question"
              className={styles.flagimg}
            />{" "}
            BOOKMARKED
          </button>
        
        </div>
        <p className={styles.underline} />
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        <div>
          {questions.length > 0
            ? questions.map((question, index) =>
                <div key={index} className={styles.flagged}>
                  <div className={styles.question}>
                    <button className={styles.flagsection}>
                      <img
                        src="./images/quiz/dialog/flag.png"
                        alt="Flag Question"
                        className={styles.flagimg}
                      />
                    </button>
                    <div>
                      {question.question}
                    </div>
                  </div>
                  <p className={styles.underline} />
                </div>
              )
            : <p>No questions available.</p>}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dialog;
