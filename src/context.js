import React, { useState, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { nanoid } from "nanoid";
import Flashcard from "./components/Practice_SubComponents/Flashcard";

const AppContext = React.createContext();

const initialState = {
  alert: "",
  text: "",
  loading: true,
  practiceOption: <Flashcard />,
  practiceLanguage: "english",
  dropdownShow: true,
  answerSelected: "reset",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [list, setList] = useState([]);
  const listRef = "word-list";
  const [practiceWord, setPracticeWord] = useState({
    wordQuestion: "",
    wordAnswer: "",
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    getList("loading");
  }, []);

  const getList = async (load) => {
    // take diff parameter for some cases to avoid page refresh & loading display on save(home), edit & delete(list)
    dispatch({ type: load });
    setList(
      localStorage.getItem("word-list")
        ? JSON.parse(localStorage.getItem("word-list"))
        : []
    );
    dispatch({ type: "display-page" });
  };

  const addToLocalStorage = (english, korean) => {
    const id = nanoid();
    const newWord = { id, english, korean };
    const newList = [...list, newWord];
    localStorage.setItem(listRef, JSON.stringify(newList));
  };

  const saveWord = (newWord) => {
    const { eng, kor } = newWord;
    if (eng && kor) {
      displayAlert("success");
      addToLocalStorage(eng, kor);
      getList("display-page");
    } else if (eng && !kor) {
      displayAlert("kor-missing");
    } else if (!eng && kor) {
      displayAlert("eng-missing");
    } else {
      displayAlert("no-words");
    }
  };

  const editWord = (newWord) => {
    const { word, type, id } = newWord;
    const editedList = list.map((item) => {
      if (item.id === id) {
        item[type] = word;
      }
      return item;
    });

    displayAlert("word-edited");
    localStorage.setItem(listRef, JSON.stringify(editedList));
    getList("display-page");
  };

  const deleteWord = (id) => {
    displayAlert("word-deleted");
    const newList = list.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem(listRef, JSON.stringify(newList));
    getList("display-page");
  };

  const displayAlert = (value) => {
    dispatch({ type: value });
    setTimeout(() => {
      dispatch({ type: "no-alert" });
    }, 3000);
  };

  const selectPractice = (option) => {
    dispatch({ type: option });
  };

  const getPracticeLanguage = (lang) => {
    dispatch({ type: lang });
  };

  const getPracticeWord = (type) => {
    let word;

    if (type === "first") {
      word = list[count];
    } else if (type === "random") {
      const randomNum = Math.floor(Math.random() * list.length);
      word = list[randomNum];
    }

    const questionLanguage =
      state.practiceLanguage === "english" ? "korean" : "english";
    const wordQuestion = word[questionLanguage];
    const wordAnswer = word[state.practiceLanguage];

    setPracticeWord({ wordQuestion, wordAnswer });
  };

  const checkNumber = (num) => {
    return num > list.length - 1 ? 0 : num < 0 ? list.length - 1 : num;
  };

  const nextWord = () => {
    let newCount = count + 1;
    setCount(checkNumber(newCount));
  };

  const previousWord = () => {
    let newCount = count - 1;
    setCount(checkNumber(newCount));
  };

  const checkAnswer = (target) => {
    if (target.innerText === practiceWord.wordAnswer) {
      dispatch({ type: "correct" });
      target.classList.add("correct");
      setTimeout(() => {
        dispatch({ type: "reset" });
        target.classList.remove("correct");
        getPracticeWord("random");
      }, 1000);
    } else {
      dispatch({ type: "incorrect" });
      target.classList.add("incorrect");
      setTimeout(() => {
        dispatch({ type: "reset" });
        target.classList.remove("incorrect");
      }, 1000);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        list,
        practiceWord,
        count,
        dispatch,
        saveWord,
        deleteWord,
        editWord,
        displayAlert,
        getList,
        selectPractice,
        nextWord,
        previousWord,
        getPracticeWord,
        getPracticeLanguage,
        checkAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
