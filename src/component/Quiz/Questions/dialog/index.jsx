import React , { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Create styles for the dialog
import axios from 'axios';

const Dialog = ({ onClose, questions }) => {
  const [flags, setFlags] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handleFlagQuestion = async (questionIndex) => {
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
      console.error('Error updating flag status:', error);
    }
  };
    return (
      <div className={styles.dialogOverlay}>
        <div className={styles.dialogContent}>
          <button onClick={onClose} className={styles.closeButton}>Close</button>
          <div>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={index} className={styles.question}>
                            <div >
                  <button className={styles.flagsection}>
                    <img
                      src="./images/quiz/bookmark.png"
                      alt="Flag Question"
                      className={styles.flagimg} />
                  </button>
                </div>
                <div>         <p>{question.question}</p></div>
         
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