import React, { useState , useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Footer from '../Home/Footer';
import QuizNav from "./nabar";
import axios from 'axios';
import { useQuiz } from '../../hooks/QuizContext';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

const MainQuiz = ({ onStartQuiz}) => {
    const location = useLocation();
    const { quizId, durationQuiz } = location.state || {}; 
    const [started, setStarted] = useState(false);
    // const { quizId, setQuizId } = useQuiz();
    // const navigate = useNavigate();
    // const { quizId, setQuizId } = useQuiz();
    // const { quizduration, setDurationQuiz } = useQuiz();

    // useEffect(() => {
    //     const storedQuizId = localStorage.getItem('quizId');
    //     if (storedQuizId) {
    //         setQuizId(storedQuizId);
        
    //     }
    // }, []);
    const startStatment =() => {
        setStarted(true);
        // console.log(started);
        
        // setQuizId(quizId);
        console.log("quizID",quizId);
        console.log("time",durationQuiz);
        
        // setQuizId(quizId);
        // setDurationQuiz(quizduration)
        // try {
        //     const response = await axios.post(
        //       "http://localhost:5050/api/quizapi/quiz/create/4",
        //       { quizName: "Sample Quiz" }
        //     );
        //     const quizId = response.data._id;
        //     localStorage.setItem('quizId', quizId);
        //     console.log('quizId', quizId); // Save quizId to localStorage
        //     setQuizId(quizId);
        //     setStarted(true);
        // } catch (error) {
        //     console.error('Error creating quiz:', error);
        // }
    };
    // useEffect(() => {
    //     const storedQuizId = localStorage.getItem('quizId');
    //     if (storedQuizId) {
    //         setQuizId(storedQuizId);
        
    //     }
    // }, [setQuizId]);
    const [quiz, setQuiz] = useState({
        questions: [],
        quizName: '',
        score: '',
        incorrectlyAnsweredQuestions: [],
        flaggedQuestions: [],
        courseID:   ''
      })
    
      useEffect(() => {
     
        const fetchQuiz = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}api/quiz/${quizId}`);
        
            
            setQuiz(response.data);
            console.log("current quiz",response.data.courseID);
    
          } catch (error) {
            console.error("Error fetching candidate data:", error);
          }
    
    
    
        };
        fetchQuiz();
      }, [quizId]);
      console.log(`${process.env.REACT_APP_API}api/quiz/${quizId}`);
      const navigate = useNavigate();
    
    function goToHome() {
      console.log("quiz.courseID",quiz.courseID);
      
      navigate(`/Course/${quiz.courseID}`);
    }
    
    return (
        <>
            {!started ? (<div className={styles.containerQuiz}>
                <div className={styles.quiNav}>
                    <QuizNav quizId={quizId} />
                </div>
                <div className={styles.container}>
                    <div className={styles.textContainer}>
                        The Product Owner Open assessment is a tool for validating your basic knowledge of the Product Owner accountabilities within the Scrum framework. Taking the Product Owner Open assessment will allow you to create a baseline of your current knowledge, from which you can start improving immediately. This assessment is free and does not include any certification. The assessment is designed to assess one's understanding of Product Backlog management and maximizing value of a product. It is one useful tool for those preparing to take <span>the Professional Scrum Product Owner</span> I certification test. Before attempting the Product Owner Open assessment it is highly recommended that you review the <span>Scrum Guide</span>. One way to improve is through our <span>Professional Scrum Product Owner</span> training class and online <span>Product Owner Learning Path</span>.<br /> The assessment consists of 15 questions randomly selected from a larger pool.
                    </div>
                    <div className={styles.buttoncontainer} >
                    <div > <button onClick={goToHome} className={styles.goback}>Go Back</button></div>
                        <button onClick={startStatment} className={styles.start}>Start Assessment</button>

                    </div>
                </div>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>) : (
                <>
             
                    
    <div className={styles.imgcontainer}>
                        <img src="images/quiz/assemt.png" alt="" className={styles.instructionimage} />
                    </div>

                    <div className={styles.backimage}>
                        <div className={styles.logo} style={{ margintop: '51' }}>
                            <img src="images/quiz/copywright.png" alt="" className={styles.logoimag} />

                        </div>
                        <div className={styles.product}>PRODUCT OWNER OPEN</div>
                    </div>
                  
                    <div className={styles.assessmentContainer}>


                        <div >
                            <div className={styles.questiontext}><span className={styles.questiontext}>Instructions </span>
                                <p className={styles.underline}></p></div>
                            <div className={styles.instructiontext}>
                                <div>
                                    <ul>
                                        <li>Number of questions: <b>15</b></li>
                                        <li>Has a time limit of: <b>{durationQuiz}</b></li>
                                        <li>Must be finished in one sitting. You cannot save and finish later.</li>
                                        <li>Questions displayed per page: <b>1</b></li>
                                        <li>Will allow you to go back and change your answers.</li>
                                        <li>Will not let you finish with any questions unattended.</li>
                                        <li>Has a pass mark of: <b>85%</b></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className={styles.continuebutton}>
                            <button className={styles.continue}>    <Link 
        to={`/question`} 
        style={{ color: 'white' }} 
        onClick={onStartQuiz} 
        state={{ quizId, durationQuiz }}
      >
        Continue
      </Link></button>
                        </div>
                    </div>
                  
                </>
            )}

        </>
    );
};

export default MainQuiz;