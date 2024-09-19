import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import Nav from "../../Nav";
import { Link, useNavigate, useLocation } from "react-router-dom"; 

const QuizNav = ({quizId}) => {
console.log("quizId",quizId);


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
    {/* <div className={ styles.background}>
    <img src="./images/home/quizbackground.png" alt="" className={styles.imagebackground} />
  </div> */}
  <div className={styles.backimage}>
  <div className={styles.navContainer}>
       <Nav   />
       </div>

       <div className={styles.pdcontainer}>
<div className={styles.pdowncontainer}> 
    <div className={styles.pdown} >PRODUCT OWNER OPEN
    <p className={styles.underline}></p>
    </div>
   <div  className={styles.text}>Assess Your Knowledge Of The Product Owner Accountabilities</div> 
</div>
<div> <button onClick={goToHome}>Go Back</button></div>
</div>
</div>  

    </>
  );
};

export default QuizNav;