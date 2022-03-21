import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    if (list.length > 2) {
      createAnswers();
    }
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

  if (list.length > 2) {
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

  return (
    <div className="text-center mt-5">
      <p className="fs-4">
        Your need at least 3 words in your list to do the test, click the button
        below to add more words
      </p>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
        </svg>
      </Link>
    </div>
  );
}
