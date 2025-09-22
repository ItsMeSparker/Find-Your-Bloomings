import React, { useEffect, useState, useRef } from 'react';
import '/src/Components/Quiz/Quiz.css';
import Sunflower from '/src/assets/Helianthus Big Smile.png'
import Celosia from '/src/assets/Celosia Plumosa.png'
import Gomphrena from '/src/assets/Gomphrena Gnome.png'
import Vunca from '/src/assets/Vunca Sun Jewels.png'

import Land from '/src/assets/question_images/IMG_3317.PNG'
import Lock from '/src/assets/question_images/IMG_3320.PNG'
import People from '/src/assets/question_images/IMG_3321.PNG'
import Chair from '/src/assets/question_images/IMG_3323.PNG'
import Feiry from '/src/assets/question_images/IMG_3324.PNG'
import Tree from '/src/assets/question_images/IMG_3325.PNG'
import Train from '/src/assets/question_images/IMG_3326.PNG'
import Cups from '/src/assets/question_images/IMG_3327.PNG'

const Quiz = ({ data }) => {

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [selectedAns, setSelectedAns] = useState(null);
  const [score, setScore] = useState({'V': 0, 'S': 0, 'C': 0, 'G': 0});
  const [finalResult, setFinalResult] = useState('');
  const resultImages = {
    Sunflower: Sunflower,
    Celosia: Celosia,
    Gomphrena: Gomphrena,
    Vunca: Vunca
  };

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const questionImages = [Land, Lock, People, Chair, Feiry, Tree, Train, Cups];
  const optionArray = [Option1, Option2, Option3, Option4];
  const scoreSystem = [[{'V': 2, 'S': 1}, {'S': 2, 'G': 1}, {'C': 2, 'G': 1}, {'G': 2, 'V': 1}], //1st Question
                    [{'V': 2, 'C': 1}, {'S': 2, 'V': 1}, {'C': 2, 'S': 1}, {'G': 2, 'S': 1}], //2nd Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}], //3rd Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}], //4th Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'G': 1}, {'C': 2, 'G': 1}, {'G': 2, 'V': 1}], //5th Question
                    [{'V': 2, 'G': 1}, {'S': 2, 'V': 1}, {'C': 2, 'S': 1}, {'G': 2, 'C': 1}], //6th Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}], //7th Question
                    [{'V': 2, 'S': 1}, {'S': 2, 'V': 1}, {'C': 2, 'G': 1}, {'G': 2, 'C': 1}]]; // 8th Question

  const getResult = (finalScore) => {
    const maxKey = Object.keys(finalScore).reduce((a, b) => finalScore[a] > finalScore[b] ? a : b);

    switch (maxKey) {
      case 'V':
        return 'Vunca';
      case 'S':
        return 'Sunflower';
      case 'C':
        return 'Celosia';
      case 'G':
        return 'Gomphrena';
      default:
        return 'Sunflower';
    }
  }

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
    

      if (index === data.length - 1){
        const resultName = getResult(updatedScore);
        setFinalResult(resultName);
        setResult(true);
        return 0;
      }
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
    <>
      {result?<></>:<>
      <h1>Find Your Bloomling</h1>
      <hr />
        <h2>{index + 1}. {question.question}</h2>
        <div className="image-frame">
          <img src={questionImages[index]} alt={questionImages[index]} className="question-image" />
        </div>
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
      <img src={resultImages[finalResult]} alt={finalResult} className="result-image" />
      </>:<hr />}
    </>
  );
}

export default Quiz;