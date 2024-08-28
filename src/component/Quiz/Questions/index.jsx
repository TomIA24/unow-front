
import React, { useState, useEffect } from 'react';
import Dialog from './dialog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import styles from "./styles.module.css";
import CircularTimer from "./timer";
import { useQuiz } from '../../../hooks/QuizContext';
import { useLocation } from 'react-router-dom';


const Quiz = ({ startDate }) => {
  const location = useLocation();
  const { quizId, durationQuiz } = location.state || {};
  // Save quizId to sessionStorage
  const storedQuizId = localStorage.getItem("quizId");
  console.log("Quiz ID:", storedQuizId);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(100);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const [finishDate, setFinishDate] = useState(null);
  const [finishbutton, setFinishButton] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [timeRanOut, setTimeRanOut] = useState(false);

  const numb = 4; // Number of questions to fetch
  let time = durationQuiz*60;
  const navigate = useNavigate();

  const handletimeout = () => {
    navigate("/timeout");
  };
  const handleTimeRanOut = () => {
    // setTimeRanOut(true);
    handletimeout();
    handleSubmit();
  };

  const handleMenuClick = () => {
    setIsDialogOpen(!isDialogOpen);
    console.log("clicked");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const killMistakeCheckResponse = await axios.get('http://localhost:5050/api/quizapi/checkillmistakempty');
  //       const isKillMistakeEmpty = killMistakeCheckResponse.data.isEmpty;

  //       let questionresp, killMistakeQuestions = [];
  //       if (isKillMistakeEmpty) {
  //         questionresp = await axios.get(`http://localhost:5050/api/quizapi/quiz/${numb}`);
  //       } else {
  //         questionresp = await axios.get(`http://localhost:5050/api/quizapi/quiz/${numb}`);
  //         const killMistakeResp = await axios.get(`http://localhost:5050/api/quizapi/randomkillmistakes/${numb}/${time}`);
  //         console.log('killMistakeResp', killMistakeResp);
  //         killMistakeQuestions = killMistakeResp.data.questions|| [];
  //         console.log("killmistake", killMistakeResp.data);
  //       }

  //       console.log('question before concat', questionresp);
  //       let fetchedQuestions = [];
  //       if (Array.isArray(questionresp.data)) {
  //         fetchedQuestions = questionresp.data;
  //       } else if (questionresp.data.questions) {
  //         fetchedQuestions = questionresp.data.questions;
  //       }

  //       const combinedQuestions = [...fetchedQuestions, ...killMistakeQuestions].filter(question => question !== undefined);

  //       setQuestions(combinedQuestions);
  //       console.log("combined questions",combinedQuestions);
  //       const initialAnswers = combinedQuestions.reduce((acc, _, idx) => ({ ...acc, [idx]: [] }), {});
  //       setSelectedAnswers(initialAnswers);
  //       setFlags(Array(combinedQuestions.length).fill(false));
  //     } catch (error) {
  //       console.error('Error fetching quiz:', error);
  //     }
  //   };

  //   fetchQuestions();
  // }, [numb, time]);
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) return; // Skip fetching if quizId is not available

      try {
        const response = await axios.get(
          `http://localhost:5050/api/quiz/api/quiz/${quizId}/questions`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleCheckboxChange = (questionIndex, answer) => {
    const updatedSelectedAnswers = { ...selectedAnswers };
    if (!updatedSelectedAnswers[questionIndex]) {
      updatedSelectedAnswers[questionIndex] = [];
    }

    if (updatedSelectedAnswers[questionIndex].includes(answer)) {
      updatedSelectedAnswers[questionIndex] = updatedSelectedAnswers[
        questionIndex
      ].filter((a) => a !== answer);
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
    let newScore =0;
    handleFinishDate();
    const updatedQuestions = questions.map((question, index) => {
      let isCorrect = false;

      if (
        selectedAnswers[index] !== undefined &&
        selectedAnswers[index].length > 0
      ) {
        if (Array.isArray(selectedAnswers[index])) {
          isCorrect = selectedAnswers[index].every((answer) =>
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

    let percentageCorrect = (correctAnswers / totalQuestions) * 100;

    console.log("Updated Questions:", updatedQuestions);
    console.log("New Score:", newScore);
    console.log("Percentage Correct:", percentageCorrect);

    newScore = Math.round(newScore);
    setScore(percentageCorrect);
    setShowScore(true);

    try {
      await axios.put(
        `http://127.0.0.1:5050/api/quiz/updateQuiz/${quizId}`,
        {
          questions: updatedQuestions,
          quizName: "My Quiz2",
          score: percentageCorrect,
        }
      );

      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  // const handleFlagQuestion = async (questionIndex) => {
  //   const questionId = questions[questionIndex]._id;
  //   const updatedFlags = [...flags];
  //   updatedFlags[questionIndex] = !updatedFlags[questionIndex];
  //   setFlags(updatedFlags);

  //   // Update the flag status in the backend
  //   try {
  //     await axios.put(`http://localhost:5050/api/quizapi/mark/${questionId}`, {
  //       flag: updatedFlags[questionIndex]
  //     });
  //   } catch (error) {
  //     console.error('Error updating flag status:', error);
  //   }
  // };
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleFlagQuestion = async (questionIndex) => {
    const question = questions[questionIndex];
    const questionId = questions[questionIndex]._id; // Ensure this ID is correct
    // Replace with actual quizId

    const isFlagged = !flags[questionIndex]; // Toggle flag status

    try {
      await axios.put(
        `http://127.0.0.1:5050/api/quiz/${quizId}/question/${questionId}`,
        {
          question: question.question, // Include current data
          correctAnswers: question.correctAnswers,
          wrongAnswers: question.wrongAnswers,
          argument: question.argument,
          checked: question.checked,
          flag: isFlagged,
        }
      );

      const updatedFlags = [...flags];
      updatedFlags[questionIndex] = isFlagged;
      setFlags(updatedFlags);

      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].flagged = isFlagged;
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error(
        "Error flagging question:",
        error.response?.data || error.message
      );
      // Display or handle the error accordingly
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      if (nextQuestion === questions.length - 1) {
        setFinishButton(true);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      handleSubmit();
    }
  };
  const isAnyAnswerSelected = (questionIndex) => {
    const answers = selectedAnswers[questionIndex];
    return Array.isArray(answers) ? answers.length > 0 : !!answers;
  };

  return (
    <>
      <>
        {showScore ? (
          <>
            <div className={styles.backimagescore}>
              <div className={styles.logoscore}>
                <img
                  src="./images/quiz/copywright.png"
                  alt=""
                  className={styles.logoimag}
                />
              </div>
            </div>
          </>
        ) : (
          <div className={styles.backimagecontainer}>
            <div className={styles.backimage}>
              <div className={styles.quizcontainer}>
                {/* <img src="./start/back1.png" alt="" className={styles.imagebackground} /> */}

                <div className={styles.logo}>
                  <img
                    src="./images/quiz/copywright.png"
                    alt=""
                    className={styles.logoimag}
                  />
                </div>
                <div className={styles.container}>
                  <div className={styles.containerTimer}>
                    {" "}
                    <CircularTimer
                      duration={time}
                      onComplete={handleTimeRanOut}
                      className={styles.timer}
                    />
                  </div>

                  <div className={styles.productcont}>
                    <img
                      src="./images/quiz/scrumorg.png"
                      alt=""
                      className={styles.scrumorg}
                    />
                    <div className={styles.product}>PRODUCT OWNER OPEN</div>
                    <div className={styles.menulist}>
                      <button className={styles.menu}>
                        <img
                          src={
                            isDialogOpen
                              ? "./images/quiz/menu.png"
                              : "./images/quiz/menuopen.png"
                          }
                          className={styles.menu}
                          alt=""
                          onClick={handleMenuClick}
                        />
                      </button>
                      <div>See all questions</div>
                    </div>
                  </div>
                </div>
                {isDialogOpen && (
                  <div className={styles.menudialog}>
                    <Dialog
                      onClose={handleCloseDialog}
                      quizId={storedQuizId}
                      setCurrentQuestionIndex={setCurrentQuestion}
                      currentQuestion={currentQuestion}
                      isAnyAnswerSelected={isAnyAnswerSelected}
                    >
                      <div>Here are all the questions...</div>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showScore ? (
          <div className={styles.quiz}>
            <div className={styles.scoresection}>
              {!timeRanOut && (
                <div className={styles.warning}>
                  <div>
                    <img
                      src="./images/quiz/warning.png"
                      alt=""
                      className={styles.warningimg}
                    />
                  </div>
                  <div className={styles.textwarning}>
                    {" "}
                    <b>Note:</b> This Test was automatically finished when
                    either:
                    <br />
                    <br />
                    <b>1.</b> Its time limit was reached when taking the Test.
                    <br />
                    <b>2.</b> An attempt to resume this Test was not allowed due
                    to date or time limits.
                  </div>
                </div>
              )}

              {score >= 0 ? (
                <div className={styles.score}>
                  <div className={styles.scoreInn}>
                    <div>
                      <div className={styles.scrum2}>
                        <img src="./images/quiz/scrumorg2.png" alt="" />
                      </div>
                      <div className={styles.results}>
                        Product Owner Open
                        <p className={styles.underlineresult}></p>
                      </div>
                      <ul>
                        <li>
                          <b>Percentage:</b>
                          <span>{score}%</span>
                        </li>
                        <li>
                          <b>Duration:</b>
                          <span>00:03:00</span>
                        </li>
                        <li>
                          <b>Date started:</b>
                          <span>{startDate}</span>
                        </li>
                        <li>
                          <b>Date finished:</b>
                          <span>{finishDate}</span>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.succ}>
                      <div className={styles.succtext}>Congratulations</div>
                      <img
                        src="./images/quiz/secc.png"
                        alt=""
                        className={styles.imagesecc}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.score}>
                    <div className={styles.scoreInn}>
                      <div>
                        <div className={styles.scrum2}>
                          <img src="./images/quiz/scrumorg2.png" alt="" />
                        </div>
                        <div className={styles.results}>
                          Product Owner Open
                          <p className={styles.underlineresult}></p>
                        </div>
                        <ul>
                          <li>
                            <b>Percentage:</b>
                            <span>{score}%</span>
                          </li>
                          <li>
                            <b>Duration:</b>
                            <span>00:03:00</span>
                          </li>
                          <li>
                            <b>Date started:</b>
                            <span>{startDate}</span>
                          </li>
                          <li>
                            <b>Date finished:</b>
                            <span>{finishDate}</span>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.echec}>
                        <div className={styles.echectext}>
                          Sometimes, Even{" "}
                          <span style={{ color: "#CD6214" }}>Geniuses</span>{" "}
                          Make Mistakes
                        </div>
                        <img
                          src="./images/quiz/echec.png"
                          alt=""
                          className={styles.imageechec}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            {questions && questions.length > 0 ? (
              <>
                {!isDialogOpen && (
                  <div className={styles.questionquiz}>
                    <div className={styles.questionsection}>
                      <div className={styles.questioncount}>
                        <div className={styles.questiontext}>
                          <span className={styles.questiontext}>
                            Question {currentQuestion + 1}
                          </span>
                          /{questions.length}
                          <p className={styles.underline}></p>
                        </div>
                        <div className={styles.question}>
                          {questions[currentQuestion].question}
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => handleFlagQuestion(currentQuestion)}
                          className={styles.flagsection}
                        >
                          <img
                            src={
                              flags[currentQuestion]
                                ? "./images/quiz/bookmark.png"
                                : "./images/quiz/unbooked.png"
                            }
                            alt="Flag Question"
                            className={styles.flagimg}
                          />
                        </button>
                      </div>
                    </div>
                    <div className={styles.answersection}>
                      {questions[currentQuestion].correctAnswers.length === 1
                        ? questions[currentQuestion].correctAnswers
                            .concat(questions[currentQuestion].wrongAnswers)
                            .map((answer, index) => (
                              <label
                                key={index}
                                className={styles.rdiocontainer}
                              >
                                <input
                                  type="radio"
                                  name={`question-${currentQuestion}`}
                                  checked={
                                    selectedAnswers[currentQuestion] === answer
                                  }
                                  onChange={() =>
                                    handleRadioChange(currentQuestion, answer)
                                  }
                                />
                                {answer}
                                <span className={styles.radio}></span>
                              </label>
                            ))
                        : questions[currentQuestion].correctAnswers
                            .concat(questions[currentQuestion].wrongAnswers)
                            .map((answer, index) => (
                              <label
                                key={index}
                                className={styles.checkmarkcontainer}
                              >
                                <input
                                  type="checkbox"
                                  name={`question-${currentQuestion}`}
                                  checked={
                                    selectedAnswers[currentQuestion] &&
                                    selectedAnswers[currentQuestion].includes(
                                      answer
                                    )
                                  }
                                  onChange={() =>
                                    handleCheckboxChange(
                                      currentQuestion,
                                      answer
                                    )
                                  }
                                />
                                <span className={styles.checkmark}></span>
                                {answer}
                              </label>
                            ))}
                    </div>

                    <div className={styles.submitSection}>
                      {currentQuestion < questions.length - 1 ? (
                        <button
                          onClick={handleNextQuestion}
                          className={styles.butnnext}
                          disabled={!isAnyAnswerSelected(currentQuestion)}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          className={styles.submitbtn}
                        >
                          Submit
                        </button>
                      )}
                      {currentQuestion > 0 && (
                        <button
                          onClick={handlePreviousQuestion}
                          className={styles.butnprevious}
                        >
                          Previous
                        </button>
                      )}
                    </div>
                    {finishbutton && (
                      <div className={styles.finishsection}>
                        <button
                          className={styles.finishbutton}
                          onClick={handleSubmit}
                        >
                          Finish
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div> Loading ...</div>
            )}
          </>
        )}
      </>
    </>
  );
};

export default Quiz;
