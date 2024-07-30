import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; 

const Timeout = ({ duration, onComplete }) => {

    const navigate = useNavigate();


    const handleStartQuiz = () => {
      navigate('/question');
    };
  return (
    <div>
    <div className={styles.backimagtimeout} >
    
    
    <div className={styles.logotimeout}  >
      <img src="./images/quiz/copywright.png" alt="" className={styles.logoimagtimout } />
    </div>
    
    <div className={styles.producttimeout}>
      <img src="./images/quiz/scrumorg.png" alt="" className={styles.scrumorg} />
      <div className={styles.product}>PRODUCT OWNER OPEN</div>
    
    </div>
    
    </div>
    
      <div>
        
      <div className={styles.timeOutMessage}>
        <div className={styles.imagetimeout}> <img src="./images/quiz/expired.png" alt="" className={styles.imgtimeout} /></div>
        <div className={styles.timeOutText}>
    
          Your Session Has expired. Please Go back To <br /> The Test To Try Again.</div>
     
          <button onClick={handleStartQuiz} className={styles.butnprevious}>
                    start
                      </button>
      </div>

      </div>
    
      
    </div>
  );
};

export default Timeout;
