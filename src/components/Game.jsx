import { useState, useEffect } from "react";
import { fetchQuestion } from "../utils/fetchQuestions";

const Game = () => {
  const [questions, setQuestions] = useState([]);

  const startGame = () => {
    fetchQuestion().then((data) =>
      setQuestions(
        data.map((obj) => {
          {
            let shuffledAnswers = obj.answers.sort(() => Math.random() - 0.5);
            return {
              id: obj.id,
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

  



  return (
    <div className="quiz-container">
      {questions.map((question) => {
        return (
          <div key={question.id}>
            <h3>{question.question}</h3>
            {question.answers.map((answer, index) => {
              return (
                <button id={index + 1} key={index} className="">
                  {answer.answer}
                </button>
              );
            })}
            <hr />
          </div>
        );
      })}
      <button className="check-btn">Check answers</button>
    </div>
  );
};

export default Game;
