
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import CircularTimer from "./timer";

const Quiz = ({startDate}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(100);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const [finishDate, setFinishDate] = useState(null);
  const numb = 4; // Number of questions to fetch

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/quiz/api/quiz/${numb}`);
        setQuestions(response.data);
        const initialAnswers = response.data.reduce((acc, _, idx) => ({ ...acc, [idx]: [] }), {});
        setSelectedAnswers(initialAnswers);
        setFlags(Array(response.data.length).fill(false)); // Initialize flags with false
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuestions();
  }, [numb]);

  const handleCheckboxChange = (questionIndex, answer) => {

    const updatedSelectedAnswers = { ...selectedAnswers };


    if (updatedSelectedAnswers[questionIndex].includes(answer)) {
      updatedSelectedAnswers[questionIndex] = updatedSelectedAnswers[questionIndex].filter(a => a !== answer);
    } else {
      updatedSelectedAnswers[questionIndex].push(answer);
    }

    console.log(updatedSelectedAnswers);
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleRadioChange = (questionIndex, answer) => {
    const updatedSelectedAnswers = { ...selectedAnswers };
    updatedSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedSelectedAnswers);
  };
  const handleFinishDate = () => {
    const now = new Date();
    setFinishDate(now.toLocaleString());
  };

  const handleSubmit = async () => {
    let totalQuestions = questions.length;
    let correctAnswers = 0;
    let newScore = 1000;
    handleFinishDate();
    const updatedQuestions = questions.map((question, index) => {
      let isCorrect = false;
  
      // Check if question is answered
      if (selectedAnswers[index] !== undefined && selectedAnswers[index].length > 0) {
        if (Array.isArray(selectedAnswers[index])) {
          isCorrect = selectedAnswers[index].every(answer =>
            question.correctAnswers.includes(answer)
          );
        } else {
          isCorrect = question.correctAnswers.includes(selectedAnswers[index]);
        }
      } else {
        isCorrect = false;
      }
  
      if (isCorrect) {
        newScore += 1;
        correctAnswers += 1;
      }
  
      return { ...question, checked: isCorrect, flag: flags[index] };
    });
  
    // Calculate the percentage of correct answers
    let percentageCorrect = (correctAnswers / totalQuestions) * 100;
  
    console.log('Updated Questions:', updatedQuestions);
    console.log('New Score:', newScore);
    console.log('Percentage Correct:', percentageCorrect);
  
    newScore = Math.round(newScore); 
    setScore(percentageCorrect);
    setShowScore(true);
  
    try {
      await axios.post('http://127.0.0.1:5050/api/quiz/api/saveQuiz', {
        questions: updatedQuestions,
        quizName: 'My Quiz',
        score: percentageCorrect,
       // Save the percentage as well
      });
  
      // Assuming you want to update the questions state after saving
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

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
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleSubmit();
    }
  };



  return (
    <>
      {showScore ? (
        <div className={styles.backimagescore} >

          {/* <img src="./start/back1.png" alt="" className={styles.imagebackground} /> */}
          <div className={styles.logoscore}  >
            <img src="./images/quiz/copywright.png" alt="" className={styles.logoimag} />
          </div>

        </div>
      ) : (
        <div className={styles.backimagecontainer}>
          <div className={styles.backimage}>
            <div className={styles.quizcontainer}>
              {/* <img src="./start/back1.png" alt="" className={styles.imagebackground} /> */}

              <div className={styles.logo}>
                <img src="./images/quiz/copywright.png" alt="" className={styles.logoimag} />
              </div>
              <div className={styles.container}>
                <div className={styles.containerTimer}>   <CircularTimer duration={5} onComplete={handleSubmit} className={styles.timer} /></div>

                <div className={styles.productcont}>
                  <img src="./images/quiz/scrumorg.png" alt="" className={styles.scrumorg} />
                  <div className={styles.product}>PRODUCT OWNER OPEN</div>
                </div>

              </div>
            </div>
          </div>
        </div>

      )}



      
        {showScore ? (
          <div className={styles.quiz}>
          <div className={styles.scoresection}>

            <div className={styles.warning}>
              <div>
                <img src="./images/quiz/warning.png" alt="" className={styles.warningimg} />
              </div>
              <div className={styles.textwarning}>  <b>Note:</b> This Test was automatically finished when either:<br /><br />
                <b>1.</b>  Its time limit was reached when taking the Test.<br />
                <b>2.</b> An attempt to resume this Test was not allowed due to date or time limits.</div>
            </div>
            {score >= 0 ? (<div className={styles.score}>
              <div className={styles.scoreInn} >
                <div>
                  <div className={styles.scrum2}>      <img src="./images/quiz/scrumorg2.png" alt="" /></div>
          
                  <div className={styles.results}>  Product Owner Open
                    <p className={styles.underlineresult}></p>
                  </div>
                   
                  <ul>
                    <li><b>Percentage:</b><span>{score}%</span></li>
                    <li><b>Duration:</b><span>00:03:00</span></li>
                    <li><b>Date started:</b><span>{startDate}</span></li>
                    <li><b>Date finished:</b><span>{finishDate}</span></li>
                  </ul>
                  
                </div>
<div className={styles.succ}><div  className={styles.succtext}>Congratulations</div>
<img src="./images/quiz/secc.png" alt="" className={styles.imagesecc}/>
</div>
                

              </div>

            </div>) : (<div className={styles.score}>
              <div className={styles.scoreInn} >
                <div>
                <div >
                <img src="./images/quiz/scrumorg2.png" alt="" className={styles.scrum2}/>
                </div>
              
                  <div className={styles.results}>  Product Owner Open
                    <p className={styles.underlineresult}></p>
                  </div>

                  <ul>
                    <li><b>Percentage:</b><span>{score}%</span></li>
                    <li><b>Duration:</b><span>00:03:00</span></li>
                    <li><b>Date started:</b><span>{startDate}</span></li>
                    <li><b>Date finished:</b><span>{finishDate}</span></li>
                  </ul>
                </div>
<div className={styles.echec}><div  className={styles.echectext}>Sometimes, Even <span style={{ color: '#CD6214' }}>Geniuses</span> Make Mistakes</div>


<img src="./images/quiz/echec.png" alt="" className={styles.imageechec}/>
</div>
                

              </div>

            </div>)}

          </div>
          </div>
        ) : (
          questions.length > 0 && (
            <>
<div  className={styles.questionquiz}>
              <div className={styles.questionsection}>
                <div className={styles.questioncount}>
                  <div className={styles.questiontext}><span className={styles.questiontext}>Question {currentQuestion + 1}</span>/{questions.length}
                    <p className={styles.underline}></p></div>
                  <div className={styles.question}>{questions[currentQuestion].question}</div>

                </div>
                <div >
                  <button onClick={() => handleFlagQuestion(currentQuestion)} className={styles.flagsection}>
                    <img
                      src={flags[currentQuestion] ? "./images/quiz/bookmark.png" : "./images/quiz/unbooked.png"}
                      alt="Flag Question"
                      className={styles.flagimg} />
                  </button>
                </div>


              </div>
              <div className={styles.answersection}>
                {questions[currentQuestion].correctAnswers.length === 1
                  ? questions[currentQuestion].correctAnswers.concat(questions[currentQuestion].wrongAnswers).map((answer, index) => (
                    <label key={index} className={styles.rdiocontainer}>
                      <input
                        type='radio'
                        name={`question-${currentQuestion}`}
                        checked={selectedAnswers[currentQuestion] === answer}
                        onChange={() => handleRadioChange(currentQuestion, answer)}
                      />
                      {answer}
                      <span className={styles.radio}></span>
                    </label>
                  ))
                  : questions[currentQuestion].correctAnswers.concat(questions[currentQuestion].wrongAnswers).map((answer, index) => (
                    <label key={index} className={styles.checkmarkcontainer}>

                      <input
                        type="checkbox"
                        name={`question-${currentQuestion}`}
                        checked={selectedAnswers[currentQuestion] && selectedAnswers[currentQuestion].includes(answer)}
                        onChange={() => handleCheckboxChange(currentQuestion, answer)}
                      />
                      <span className={styles.checkmark}></span>
                      {answer}
                    </label>
                  ))}
              </div>

              <div className={styles.submitSection}>
                {currentQuestion > 0 && (
                  <button onClick={handlePreviousQuestion} className={styles.butnprevious}>Previous</button>
                )}
                {currentQuestion < questions.length - 1 ? (
                  <button onClick={handleNextQuestion} className={styles.butnnext}>Next</button>
                ) : (
                  <button onClick={handleSubmit} className={styles.submitbtn}>Submit</button>
                )}
              </div>
              </div>
            </>
          )
        )}

  
    </>
  );
};

export default Quiz;
