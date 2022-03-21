import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context";

export default function Write() {
  const { getPracticeWord, practiceWord, answerSelected, dispatch } =
    useGlobalContext();
  const { wordQuestion, wordAnswer } = practiceWord;
  // randomize the characters from wordAnswer so that when each is displayed as a button, it's not in order of the correct answer
  const [randomizedCharacters, setRandomizedCharacters] = useState([]);
  // used to update the input value when clicking on a char button
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  // "don't know" button to display the answer if user can't find it
  // toggle display of bottom half of container, replace the input and answer btns with the solution and a button to get another word
  const [dontKnow, setDontKnow] = useState(false);

  useEffect(() => {
    getPracticeWord("random");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRandomizedCharacters(
      wordAnswer.split("").sort(() => Math.random() - 0.5)
    );
  }, [wordAnswer]);

  const displayCharToInput = (btnValue) => {
    setInputValue((prevValue) => prevValue + btnValue);
  };

  useEffect(() => {
    document.querySelector("#answerInput").value = inputValue;
  }, [inputValue]);

  const verifyAnswer = (answer) => {
    if (answer === wordAnswer) {
      dispatch({ type: "correct" });

      setTimeout(() => {
        dispatch({ type: "reset" });

        getPracticeWord("random");
      }, 1000);
    } else {
      dispatch({ type: "incorrect" });

      setTimeout(() => {
        dispatch({ type: "reset" });
      }, 1000);
    }
    setInputValue("");
  };

  const dontKnowHandler = () => {
    setDontKnow(true);
  };

  return (
    <div
      className="border border-2 rounded d-flex flex-column justify-content-center"
      style={{ width: "100%", height: "400px" }}
    >
      <div className="my-4 px-4 d-flex justify-content-between">
        <div className="ps-2 fs-3 fw-bold">{wordQuestion}</div>
        <div>
          <button className="btn btn-link" onClick={dontKnowHandler}>
            Don't know ?
          </button>
        </div>
      </div>

      <div>
        <hr className="mx-auto" style={{ width: "80%" }}></hr>
      </div>

      {!dontKnow ? (
        <div className="px-4">
          <div className="align-items-center input-group py-4">
            <input
              type="text"
              className="form-control"
              id="answerInput"
              ref={inputRef}
              onChange={(event) => {
                setInputValue(event.currentTarget.value);
              }}
            ></input>
            {answerSelected === "correct" ? (
              <button className="btn btn-success disabled">Correct !</button>
            ) : answerSelected === "incorrect" ? (
              <button className="btn btn-danger disabled">Incorrect !</button>
            ) : (
              <button
                className="btn btn-dark"
                onClick={() => {
                  verifyAnswer(inputValue);
                }}
              >
                Answer
              </button>
            )}
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-center">
              {randomizedCharacters.map((char, i) => {
                return (
                  <button
                    className="btn btn-outline-dark mx-2"
                    key={i}
                    onClick={(event) => {
                      displayCharToInput(event.currentTarget.innerText);
                    }}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between px-4 py-4 align-items-center">
          <p className="fs-4">
            Solution: <span className="fs-3 fw-bold">{wordAnswer}</span>
          </p>
          <button
            className="btn btn-dark"
            onClick={() => {
              setDontKnow(false);
              getPracticeWord("random");
            }}
          >
            Next Word
          </button>
        </div>
      )}
    </div>
  );
}
