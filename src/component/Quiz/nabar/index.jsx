import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import Nav from "../../Nav";

const QuizNav = () => {


  return (
    <>
    {/* <div className={ styles.background}>
    <img src="./images/home/quizbackground.png" alt="" className={styles.imagebackground} />
  </div> */}
  <div className={styles.backimage}>
  <div className={styles.navContainer}>
       <Nav   />
       </div>
<div className={styles.pdowncontainer}> 
    <div className={styles.pdown} >PRODUCT OWNER OPEN
    <p className={styles.underline}></p>
    </div>
   <div  className={styles.text}>Assess Your Knowledge Of The Product Owner Accountabilities</div> 
</div>

  
</div>  

    </>
  );
};

export default QuizNav;