import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";

export default function Test() {
  const { list, practiceLanguage, practiceWord, getPracticeWord, checkAnswer } =
    useGlobalContext();
  const { wordQuestion, wordAnswer } = practiceWord;
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getPracticeWord("random");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceLanguage]);

  useEffect(() => {
    createAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceWord]);

  const createAnswers = () => {
    let arr = [wordAnswer];

    for (let i = 0; arr.length < 3; i++) {
      const randomNum = Math.floor(Math.random() * list.length);
      const newAnswer = list[randomNum][practiceLanguage];
      if (arr.indexOf(newAnswer) === -1) {
        arr.push(newAnswer);
      }
    }

    setAnswers(arr.sort(() => Math.random() - 0.5));
  };

  return (
    <div
      className="container border border-2 rounded d-flex flex-row align-items-center justify-content-center"
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    >
      <div className="row py-4" style={{ width: "100%", height: "95%" }}>
        <div className="col d-flex flex-column justify-content-center mt-2">
          <div
            className="border rounded d-flex align-items-center ps-4 fs-2 fw-bold"
            style={{ height: "75%" }}
          >
            {wordQuestion}
          </div>
          <button
            className="btn btn-dark py-2 mt-3 mx-5"
            onClick={() => getPracticeWord("random")}
          >
            Next Word
          </button>
        </div>
        <div className="col d-flex flex-column align-content-between mb-4">
          {answers.map((answer, index) => {
            return (
              <div
                key={index}
                className="my-2 fs-5 ps-4 border rounded py-4 answer-reset"
                onClick={(event) => {
                  checkAnswer(event.currentTarget);
                }}
              >
                {answer}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
