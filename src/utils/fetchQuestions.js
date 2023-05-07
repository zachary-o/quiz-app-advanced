import axios from "axios";

const url =
  "https://the-trivia-api.com/api/questions?categories=geography&limit=5&region=UA";

export const fetchQuestion = async () => {
  const questions = await axios.get(url);
  const finalQuestions = questions.data.map(
    ({ id, question, correctAnswer, incorrectAnswers }) => ({
      id,
      question,
      answers: [
        { answer: correctAnswer, isTrue: true },
        ...incorrectAnswers.map((answer) => ({ answer, isTrue: false })),
      ],
    })
  );
  return finalQuestions;
  
};

