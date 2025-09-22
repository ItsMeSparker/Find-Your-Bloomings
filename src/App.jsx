import React, { useState } from 'react';
import Quiz from './Components/Quiz/Quiz';
import { data_en } from '/src/assets/data_en.js';
import { data_th } from '/src/assets/data_th.js';
import '/src/Components/Quiz/Quiz.css';

const App = () => {
  const [quizData, setQuizData] = useState(null);

  const startQuiz = (lang) => {
    if (lang === 'en') setQuizData(data_en);
    if (lang === 'th') setQuizData(data_th);
  };

  return (
    <div className="container">
      {!quizData ? (
        <div className="home">
          <h1>🌸 Find Your Bloomling 🌸</h1>
          <p>Select a language to start / กรุณาเลือกภาษา:</p>
          <div className="btn-group">
            <button onClick={() => startQuiz('en')}>Start in English</button>
            <button onClick={() => startQuiz('th')}>เริ่มภาษาไทย</button>
          </div>
        </div>
      ) : (
        <Quiz data={quizData} />
      )}
    </div>
  );
};

export default App;
