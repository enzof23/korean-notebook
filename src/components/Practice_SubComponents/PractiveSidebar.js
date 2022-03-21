import { useGlobalContext } from "../../context";

export default function PractiveSidebar() {
  const { selectPractice } = useGlobalContext();
  const practiceOptionsArray = ["Flashcard", "Write", "Test"];

  return practiceOptionsArray.map((option, id) => {
    return (
      <button
        key={id}
        className="btn my-3 py-4 btn-light border text-start fs-5 active-border-none"
        onMouseEnter={(event) => {
          event.currentTarget.classList.add("text-light", "bg-dark");
        }}
        onMouseLeave={(event) => {
          event.currentTarget.classList.remove("text-light", "bg-dark");
        }}
        onClick={() => selectPractice(option)}
      >
        {option}
      </button>
    );
  });
}
