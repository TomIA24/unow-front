import React, { createContext, useState, useContext } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizId, setQuizId] = useState(null);
    const [quizduration, setDurationQuiz] = useState(null);

    return (
          <QuizContext.Provider value={{ quizId, setQuizId, quizduration, setDurationQuiz }}>
            {children}
        </QuizContext.Provider>
    
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
