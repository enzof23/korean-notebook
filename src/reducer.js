import Flashcard from "./components/Practice_SubComponents/Flashcard";
import Test from "./components/Practice_SubComponents/Test";
import Write from "./components/Practice_SubComponents/Write";

const reducer = (state, action) => {
  switch (action.type) {
    // toggle loading
    case "loading":
      return { ...state, loading: true };
    case "display-page":
      return { ...state, loading: false };

    // cases for alert display
    case "eng-missing":
      return {
        ...state,
        alert: "danger",
        text: "Please provide an English translation",
      };
    case "kor-missing":
      return {
        ...state,
        alert: "danger",
        text: "Please provide a Korean translation",
      };
    case "success":
      return { ...state, alert: "success", text: "Word saved successfully" };
    case "word-in-list":
      return {
        alert: "danger",
        text: "You've already saved this word",
      };
    case "no-words":
      return { ...state, alert: "danger", text: "Please enter a word" };
    case "word-edited":
      return { ...state, alert: "success", text: "Word edited successfully" };
    case "word-deleted":
      return { ...state, alert: "success", text: "Word deleted successfully" };
    case "no-alert":
      return { ...state, alert: "", text: "" };

    // each practice option has its own component, when clicking on practice nav button, display corresponding component
    case "Flashcard":
      return {
        ...state,
        practiceOption: <Flashcard />,
        dropdownShow: true,
        practiceLanguage: "english",
      };
    case "Test":
      return {
        ...state,
        practiceOption: <Test />,
        dropdownShow: true,
        practiceLanguage: "english",
      };
    case "Write":
      return {
        ...state,
        practiceOption: <Write />,
        practiceLanguage: "korean",
        dropdownShow: false,
      };

    // dropdown selection in practice page, change language to practice
    case "korean":
      return { ...state, practiceLanguage: "korean" };
    case "english":
      return { ...state, practiceLanguage: "english" };
    case "none":
      return { ...state, practiceLanguage: "english" };

    // change button style with check answer function
    case "correct":
      return { ...state, answerSelected: "correct" };
    case "incorrect":
      return { ...state, answerSelected: "incorrect" };
    case "reset":
      return { ...state, answerSelected: "reset" };

    default:
      throw new Error();
  }
};

export default reducer;
