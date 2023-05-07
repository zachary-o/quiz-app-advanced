import { useState, useEffect } from "react";
import { fetchQuestion } from "../utils/fetchQuestions";
import Question from "./Question";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [myAnswer, setMyAnswer] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [score, setScore] = useState(0);

  const startGame = async () => {
    fetchQuestion().then((data) =>
      setQuestions(
        data.map((obj, index) => {
          {
            let shuffledAnswers = obj.answers.sort(() => Math.random() - 0.5);
            return {
              id: index,
              question: obj.question,
              answers: shuffledAnswers,
            };
          }
        })
      )
    );
  };

  useEffect(() => {
    startGame();
  }, []);

  const correctAnswersFunction = () => {
    if (questions.length !== 0) {
      return {
        0: questions[0].answers.find((el) => el.isTrue === true).answer,
        1: questions[1].answers.find((el) => el.isTrue === true).answer,
        2: questions[2].answers.find((el) => el.isTrue === true).answer,
        3: questions[3].answers.find((el) => el.isTrue === true).answer,
        4: questions[4].answers.find((el) => el.isTrue === true).answer,
      };
    } else {
      return {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
      };
    }
  };

  useEffect(() => {
    setCorrectAnswers(correctAnswersFunction());
  }, [questions]);




  const chooseAnswer = (answer, id) => {
    setMyAnswer((prevObj) => ({
      ...prevObj,
      [id]: answer,
    }));
  };




  const checkAnswer = () => {
    
    const correctAnswersObj = Object.keys(correctAnswers);
    let count = 0;
    for (let i = 0; i < correctAnswersObj.length; i++) {
      const key = correctAnswersObj[i];

      if (correctAnswers[key] === myAnswer[key]) {
        count++;
      }
    }
    setScore(count);
    setCheckAnswers(true);
  };

  const newGame = () => {
    startGame();
    setMyAnswer({ 0: "", 1: "", 2: "", 3: "", 4: "" });
    setCheckAnswers(false);
  };

  
  return (
    <div className="quiz-container">
      <h1 className="title">Quizzical</h1>
      {questions.map((question) => {
        return (
          <Question
            key={question.id}
            question={question}
            chooseAnswer={chooseAnswer}
            correctAnswer={correctAnswers[question.id]}
            answer={myAnswer[question.id]}
            checkAnswers={checkAnswers}
          />
        );
      })}
      <div className="bottom-container">
        {checkAnswers && <h2>Score: {score}/5</h2>}
        <button
          className="check-btn"
          onClick={checkAnswers ? newGame : checkAnswer}
        >
          {checkAnswers ? "New Game" : "Check answers"}
        </button>
      </div>
    </div>
  );
};

export default Game;
