import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { useGlobalContext } from "../context";

export default function List() {
  const { list, deleteWord, editWord, ...state } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [editedWord, setEditedWord] = useState({ id: "", type: "", word: "" });

  // edit button to display next to a word (stored in variable to avoid repetition)
  const editBtn = (
    <AiOutlineEdit
      className="ms-1"
      fill="#17BB1D"
      display="inline-block"
      cursor="pointer"
      onClick={(event) => {
        const parent = event.currentTarget.parentElement;
        showEditInput(parent.innerText, parent.id, parent.parentElement.id);
      }}
    />
  );

  // edit button's onClick function :
  // parameters : value = word to edit value, get to display in input
  // type = parent's id to know if edited word is eng or kor
  // id = parent's parent id which is used to find word to edit in database
  // type & id are stored in editedWord state to be passed to globalContext's editWord function
  // setIsEditing to true to display input
  const showEditInput = (value, type, id) => {
    setInputText(value);
    setEditedWord((prevState) => ({ ...prevState, type, id }));
    setIsEditing(true);
  };

  // hide edit input when edit button is clicked
  const hideEditInput = () => {
    setIsEditing(false);
  };

  // input's onChange function, store new word's value in editedWord state
  const inputOnChange = (value) => {
    setInputText(value);
    setEditedWord((prevState) => ({ ...prevState, word: value }));
  };

  return (
    <div className="container col-xl-7 col-lg-10 col-md-12 mt-5">
      <div
        className={`input-group flex-nowrap mb-3 ${!isEditing && "d-none"}`}
        id="input"
      >
        <input
          type="text"
          className="form-control"
          value={inputText}
          onChange={(event) => inputOnChange(event.currentTarget.value)}
        ></input>
        <button
          className="btn btn-outline-secondary col-2"
          // pass editedWord state to editWord context's function with new word value, doc's id & object's key (type: eng or kor)
          onClick={() => {
            hideEditInput();
            editWord(editedWord);
          }}
        >
          Edit
        </button>
      </div>
      {/* editWord triggers displayAlert function, get action type from reducer and display relevant alert */}
      {state.alert ? (
        <div
          className={`alert alert-${state.alert} d-flex align-items-center`}
          role="alert"
        >
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
          <div className="ps-2">{state.text}</div>
        </div>
      ) : (
        ""
      )}

      {/* display list's table only if list has words in it, else display text */}
      {list.length > 0 ? (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3>My List</h3>
            <span>Number of words: {list.length}</span>
          </div>
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="col-5">
                  English
                </th>
                <th scope="col" className="col-5">
                  Korean
                </th>
                <th scope="col" className="col-2"></th>
              </tr>
            </thead>
            <tbody>
              {/* map over list from firebase, and create new table's row for each word with eng & kor value paired with edit btn each & delete btn for the row */}
              {list.map((word) => {
                const { english, korean, id } = word;
                return (
                  <tr id={id} key={id}>
                    <th id="english">
                      {english}
                      {editBtn}
                    </th>
                    <th id="korean">
                      {korean}
                      {editBtn}
                    </th>
                    <th className="text-end">
                      <AiFillDelete
                        // onClick function from globalContext, deletes doc in firebase and update table (fetch data & refresh)
                        onClick={() => deleteWord(id)}
                        cursor="pointer"
                        fill="#F04D5E"
                      />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        // text displayed if list is empty
        <div className="text-center">
          <p className="fs-4">
            Your list is empty, click the button below to create a new list
          </p>
        </div>
      )}
      {/* button below list linking back to home page to add new words */}
      <div className="text-center mt-4" title="Add a new word">
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
    </div>
  );
}

// onMouseEnter={(event) =>
//   (event.target.lastElementChild.style["display"] =
//     "inline-block")
// }
// onMouseLeave={(event) =>
//   (event.target.lastElementChild.style["display"] = "none")
// }
