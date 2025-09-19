import React, { useEffect, useState, useRef } from 'react';
import '/src/Components/Quiz/Quiz.css';
import { data } from '/src/assets/data_en.js';

const Quiz = () => {

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [selectedAns, setSelectedAns] = useState(null);
  const [score, setScore] = useState({'V': 0, 'S': 0, 'C': 0, 'G': 0});

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];
  const scoreSystem = [[{'V': 2, 'S': 1}, {'S': 2, 'G': 1}, {'C': 2, 'G': 1}, {'G': 2, 'V': 1}], //1st Question
                    [{'V': 2, 'C': 1}, {'S': 2, 'V': 1}, {'C': 2, 'S': 1}, {'G': 2, 'S': 1}], //2nd Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}], //3rd Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}], //4th Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'G': 1}, {'C': 2, 'G': 1}, {'G': 2, 'V': 1}], //5th Question
                    [{'V': 2, 'G': 1}, {'S': 2, 'V': 1}, {'C': 2, 'S': 1}, {'G': 2, 'C': 1}], //6th Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}], //7th Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}]]; // 8th Question

  
  const LockAnswer = (e, ansIndex) => {
    if (lock === false){
        e.target.classList.add("green");
        setSelectedAns(ansIndex);
        setLock(true);
    }
    else {
      if (e.target.classList.contains("green")){
        e.target.classList.remove("green");
        setSelectedAns(null);
        setLock(false);
      }
    }
  }

  const next = () => {
    if (!lock) return;

    if (selectedAns !== null) {
      const answerScore = scoreSystem[index][selectedAns - 1];
      const updatedScore = {...score};
      Object.keys(answerScore).forEach((key) => {
        updatedScore[key] += answerScore[key];
      });
      setScore(updatedScore);
    }

    if (index === data.length - 1){
      setResult(true);
      return 0;
    }
    const newIndex = index + 1;
    setIndex(newIndex);
    setQuestion(data[newIndex]);
    setLock(false);
    setSelectedAns(null);

    optionArray.forEach((option) => {
      option.current.classList.remove("green");
    });
  }

  return (
    <div className = 'container'>
      <h1>Find Your Bloomings</h1>
      <hr />
      {result?<></>:<>
        <h2>{index + 1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e) => {LockAnswer(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e) => {LockAnswer(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e) => {LockAnswer(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e) => {LockAnswer(e,4)}}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">{index + 1} of {data.length} questions </div>
      </>}
      {result?<>
      <h2>Your Score:</h2>
      <p>V: {score.V}</p>
      <p>S: {score.S}</p>
      <p>C: {score.C}</p>
      <p>G: {score.G}</p>
      </>:<hr />}
    </div>
  );
}

export default Quiz;