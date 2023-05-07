import React from "react";

const Question = ({
  question,
  chooseAnswer,
  correctAnswer,
  answer,
  checkAnswers,
}) => {


  const chosenStyling = (answ) => {
    if (answ === answer) {
      return "btn-chosen";
    } else {
      return "btn";
    }
  };

  const checkStyling = (answ) => {
    if (correctAnswer === answ) {
      return "btn-correct";
    } else if (answer !== correctAnswer && answer === answ) {
      return "btn-incorrect";
    }
    return "btn";
  };

  return (
    <div key={question.id} className="question-container">
      <h3>{question.question}</h3>
      {question.answers.map((answer, index) => {
        return (
          <button
          disabled={checkAnswers}
            key={index}
            className={
              checkAnswers
                ? checkStyling(answer.answer)
                : chosenStyling(answer.answer)
            }
            onClick={() => chooseAnswer(answer.answer, question.id)}
          >
            {answer.answer}
          </button>
        );
      })}
      <hr />
    </div>
  );
};

export default Question;
