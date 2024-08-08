import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './styles.module.css'; // Adjust path as needed

const Dialog = ({ onClose, quizId,index, setCurrentQuestionIndex,currentQuestion , isAnyAnswerSelected}) => {
  
  const [questions, setQuestions] = useState([]);
  const [flags, setFlags] = useState([]);
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [originalIndexes, setOriginalIndexes] = useState([]);


  // Fetch all questions initially or flagged questions based on state
  const fetchQuestions = async () => {
    try {
      const endpoint = `http://localhost:5050/api/quiz/api/quiz/${quizId}/questions`;
        const allresponse = await axios.get(`http://localhost:5050/api/quiz/api/quiz/${quizId}/questions`);
      const response = await axios.get(endpoint);
      const fetchedQuestions = response.data;

      setQuestions(fetchedQuestions);

      // Update flags array based on fetched questions
      const initialFlags = fetchedQuestions.map(question => question.flag || false);
      setFlags(initialFlags);

      // Store original indexes of the fetched questions if not bookmarked
  

    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  // Fetch questions whenever `quizId` or `showBookmarked` changes
  useEffect(() => {
    fetchQuestions();
  }, [quizId, showBookmarked]);

  const handleGotoQuestion = (index) => {

      setCurrentQuestionIndex(index);
      onClose(); // Close the dialog if needed
  
  };
  const handleFlagQuestion = async questionIndex => {
    const questionId = questions[questionIndex]._id;
    const updatedFlags = [...flags];
    updatedFlags[questionIndex] = !updatedFlags[questionIndex];
    setFlags(updatedFlags);

    // Update the flag status in the backend
    try {
      await axios.put(`http://localhost:5050/api/quiz/api/updateQuiz/${quizId}/question/${questionId}`, {
        flag: updatedFlags[questionIndex]
      });
    } catch (error) {
      console.error('Error updating flag status:', error);
    }
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogContentInner}>
          <div className={styles.menudialog}>
            <button 
               className={showBookmarked ? styles.bookmark:styles.bookmarked}  
              onClick={() => setShowBookmarked(false)}
          >
              ALL QUESTIONS
            </button>
            <button 
              className={showBookmarked ? styles.bookmarked:styles.bookmark} 
              onClick={() => setShowBookmarked(true)}
             
            >
              <img
                src={showBookmarked ? "./images/quiz/dialog/flag.png" : "./images/quiz/dialog/flagunmarked.png"}
                alt="Flag Question"
                className={styles.flagimg}
              />
              BOOKMARKED
            </button>
          </div>
          <p className={styles.underline} />
      
          <div>
          {questions.length > 0 ? (
    !showBookmarked ? (
      questions.map((question, index) => (
        <div key={index} className={styles.flagged}>
          <div className={styles.question}>
            <div className={styles.questionsection}>
              <button
                className={styles.flagsection}
                onClick={() => handleFlagQuestion(index)}
              >
                <img
                  src={flags[index] ? "./images/quiz/dialog/flag.png" : "./images/quiz/dialog/flagunmarked.png"}
                  alt="Flag Question"
                  className={styles.flagimg}
                />
              </button>
              <div className={styles.quest}>
                Question {index + 1}
              </div>
              <div className={isAnyAnswerSelected(index) ? styles.questchechked : styles.questunchechked}>
                {isAnyAnswerSelected(index) ? "Answered" : "Unanswered"}
              </div>
            </div>
            <button
              className={styles.gotoquestion}
              onClick={() => handleGotoQuestion(index)}
              disabled={!isAnyAnswerSelected(index) && !flags[index]}
            >
              <img
                src="./images/quiz/dialog/gotoquestion.png"
                alt="Goto Question"
                className={styles.gotoquestionimg}
              />
            </button>
          </div>
          <p className={styles.underline} />
        </div>
      ))
    ) : (
      questions
    .map((question, index) => ({ question, index })) // Map to include index
    .filter(({ index }) => flags[index]) // Filter based on flags
    .map(({ question, index }) => (
        <div key={index} className={styles.flagged}>
          <div className={styles.question}>
            <div className={styles.questionsection}>
              <button
                className={styles.flagsection}
                onClick={() => handleFlagQuestion(index)}
              >
                <img
                  src={flags[index] ? "./images/quiz/dialog/flag.png" : "./images/quiz/dialog/flagunmarked.png"}
                  alt="Flag Question"
                  className={styles.flagimg}
                />
              </button>
              <div className={styles.quest}>
                Question {index + 1}
              </div>
              <div className={isAnyAnswerSelected(index) ? styles.questchechked : styles.questunchechked}>
                {isAnyAnswerSelected(index) ? "Answered" : "Unanswered"}
              </div>
            </div>
            <button
              className={styles.gotoquestion}
              onClick={() => handleGotoQuestion(index)}
              disabled={!isAnyAnswerSelected(index) && !flags[index]}
            >
              <img
                src="./images/quiz/dialog/gotoquestion.png"
                alt="Goto Question"
                className={styles.gotoquestionimg}
              />
            </button>
          </div>
          <p className={styles.underline} />
        </div>
        ))
    )
  ) : (
    <p>No questions available.</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;