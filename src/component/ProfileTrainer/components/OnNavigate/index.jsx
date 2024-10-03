import styles from "./styles.module.css";

const OnNavigate = ({ onPrevious, onNext, currentDate }) => {
  return (
    <div className={styles.navigation}>
      <button type="button" onClick={onPrevious} className={styles.nav_button}>
        <svg
          className={styles.nav_icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <p className={styles.nav_date}>{currentDate}</p>
      <button onClick={onNext} type="button" className={styles.nav_button}>
        <svg
          className={styles.nav_icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default OnNavigate;
