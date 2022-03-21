import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useGlobalContext } from "../context";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/korean";

export default function Home() {
  const { saveWord, displayAlert, ...state } = useGlobalContext();
  const [newWord, setNewWord] = useState({ eng: "", kor: "" });
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  // ref is used to reset input's value when 'save' button is clicked
  const engRef = useRef(null);
  const korRef = useRef(null);

  // Input's onChange function : check id to see which input is changed and save the new value in state with corresponding key
  const getNewWord = (id, value) => {
    return id === "englishInput"
      ? setNewWord((prevState) => ({ ...prevState, eng: value }))
      : setNewWord((prevState) => ({ ...prevState, kor: value }));
  };

  // korean keyboard to type korean characters
  const keyboard = new Keyboard({
    onChange: (input) => onChange(input),
    ...layout,
  });

  // keyboard's onChange, when keyboard button is clicked, according value in passed to input
  const onChange = (input) => {
    document.querySelector("#koreanInput").value = input;
    setNewWord((prevState) => ({ ...prevState, kor: input }));
  };

  return (
    <div className="container col-xxl-6 col-xl-8 col-lg-8 col-md-10 col-sm-12 mt-5">
      <div className="container bg-light">
        <h1 className="text-center py-4">Add a new word to your list</h1>
        <form className="py-3 col-11 mx-auto">
          <div className="pb-3">
            <label htmlFor="englishInput" className="form-label pb-1">
              English
            </label>
            <input
              type="text"
              className="form-control"
              id="englishInput"
              ref={engRef}
              placeholder="e.g Hello"
              onChange={(event) => {
                getNewWord(event.target.id, event.target.value);
              }}
            ></input>
          </div>

          <hr className="col-6 mx-auto"></hr>

          <div className="pb-3">
            <label htmlFor="koreanInput" className="form-label pb-1">
              Korean
            </label>
            <input
              type="text"
              className="form-control"
              id="koreanInput"
              ref={korRef}
              placeholder="e.g 안녕하세요"
              onChange={(event) => {
                getNewWord(event.target.id, event.target.value);
              }}
            ></input>
            {/* toggle keyboard, using collapse method to toggle display and state to change a's text */}
            <a
              href="#keyboard"
              className="fs-6 ps-1 text-decoration-underline"
              data-bs-toggle="collapse"
              data-bs-target="#keyboard"
              onClick={() => {
                setKeyboardIsShown(!keyboardIsShown);
              }}
            >
              {keyboardIsShown ? "hide" : "expand"} korean keyboard
            </a>
          </div>
          <div className="collapse my-2" id="keyboard">
            {keyboard}
          </div>

          <div className="d-grid col-3 mx-auto py-3">
            <button
              type="button"
              className="btn btn-dark"
              // on click, pass state value from input's onChange to globalContext's saveWord() function
              // reset local state and input's value
              onClick={() => {
                saveWord(newWord);
                setNewWord({ eng: "", kor: "" });
                engRef.current.value = "";
                korRef.current.value = "";
              }}
            >
              Save
            </button>
          </div>
          {/* when saveWord's function is called, a different alert is passed to reducer, based on this action type, display according alert (ref recuder.js) */}
          {/* action type will alter alert's style, message and svg */}
          {state.alert ? (
            <div
              className={`alert alert-${state.alert} d-flex align-items-center`}
              role="alert"
            >
              {/* alert's svg */}
              {state.alert === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-exclamation-octagon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              )}
              {/* alert's text */}
              <div className="ps-2">{state.text}</div>
            </div>
          ) : (
            // if no alert, hide alert's container
            ""
          )}
        </form>
      </div>

      {/* buttons to access list and practice, onclick is added to make sure alert's display isn't still active when changing page */}
      <div className="container mt-5">
        <div className="row">
          <Link
            to="/list"
            className="col btn btn-dark mx-5 py-3"
            onClick={() => {
              displayAlert("no-alert");
            }}
          >
            GO TO MY LIST
          </Link>
          <Link
            to="/practice"
            className="col btn btn-dark mx-5 py-3"
            onClick={() => {
              displayAlert("no-alert");
            }}
          >
            GO TO PRACTICE
          </Link>
        </div>
      </div>
    </div>
  );
}
