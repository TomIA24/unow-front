import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const CircularTimer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isComplete, setIsComplete] = useState(false);
  const [radius, setRadius] = useState(60);

  const getSvgStyles = () => {
    const isSmallScreen = window.innerWidth < 600;
    const cx = isSmallScreen ? 150 : 150; // Adjusted for small screens
    const cy = isSmallScreen ? 150 : 70; // Adjusted for small screens
    return { cx, cy };
  };
  const { cx, cy } = getSvgStyles();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [timeLeft, onComplete]);

  let timerColor = '#49C382'; 
  if (timeLeft <= 300) {
    timerColor = '#F39D6E';  
  }  if (timeLeft <= 120) {
    timerColor = '#E74C3C'; 
  }


  useEffect(() => {
    const updateRadius = () => {
      const isSmallScreen = window.innerWidth;
      if (isSmallScreen < 400 ){
        setRadius(37);
      }
      else if (isSmallScreen < 500 ){
        setRadius(40 );
      } else if (isSmallScreen < 800 ){
        setRadius(50);
      }else{
        setRadius(60 );
      }
      
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / duration) * circumference;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerContainer}>
    
      <svg className={styles.timerSvg}>
        <circle
          className={styles.timerCircle}
          stroke={timerColor}
          strokeWidth="9"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className={styles.timerText}>
      <div className={styles.timerLabel}>Time Left</div>
        {isComplete ? "Time's up!" : formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default CircularTimer;
