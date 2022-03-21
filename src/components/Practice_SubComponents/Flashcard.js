import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

export default function Flashcard() {
  const {
    count,
    list,
    practiceWord,
    practiceLanguage,
    getPracticeWord,
    nextWord,
    previousWord,
  } = useGlobalContext();
  const { wordQuestion, wordAnswer } = practiceWord;
  const [displayAnswer, setDisplayAnswer] = useState(false);

  useEffect(() => {
    getPracticeWord("first");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, practiceLanguage]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center mx-auto border border-2 rounded cursor"
        style={{ width: "90%", height: "90%", minHeight: "400px" }}
        onClick={() => {
          setDisplayAnswer(!displayAnswer);
        }}
      >
        <div className="fs-1">{!displayAnswer ? wordQuestion : wordAnswer}</div>
      </div>
      <div
        className="mt-2 mx-auto d-flex justify-content-between align-items-center"
        style={{ width: "40%" }}
      >
        <button
          className="btn bg-transparent hover rounded-circle d-flex justify-content-center align-items-center p-0"
          style={{ width: "40px", height: "40px" }}
          onClick={() => {
            if (displayAnswer) {
              setDisplayAnswer(false);
            }
            previousWord();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </button>

        {`${count + 1} / ${list.length}`}

        <button
          className="btn bg-transparent hover rounded-circle d-flex justify-content-center align-items-center p-0"
          style={{ width: "40px", height: "40px" }}
          onClick={() => {
            if (displayAnswer) {
              setDisplayAnswer(false);
            }
            nextWord();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg>
        </button>
      </div>
    </>
  );
}
