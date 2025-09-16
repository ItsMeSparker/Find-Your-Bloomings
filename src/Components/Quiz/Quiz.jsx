import React, { useEffect, useState, useRef } from 'react';
import '/src/Components/Quiz/Quiz.css';
import { data } from '/src/assets/data_en.js';

const Quiz = () => {

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArray = [Option1, Option2, Option3, Option4];

  const LockAnswer = (e) => {
    if (lock === false){
        e.target.classList.add("green");
        setLock(true);
    }
    else {
      if (e.target.classList.contains("green")){
      e.target.classList.remove("green");
      setLock(false);
      }
    }
  }

  const next = () => {
    if (lock===true){
      if (index === data.length - 1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove("green");
        return null;
      })
    }
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
    </div>
  );
}

export default Quiz;