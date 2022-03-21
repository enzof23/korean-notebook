import { useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import PractiveSidebar from "./Practice_SubComponents/PractiveSidebar";

export default function Practice() {
  const {
    list,
    practiceOption,
    getPracticeLanguage,
    practiceLanguage,
    dropdownShow,
  } = useGlobalContext();
  const dropdown = document.querySelector("#dropdown");

  // change dropdown value when switching between practice option so it displays the default language (diff for each option)
  useEffect(() => {
    if (dropdown) {
      dropdown.value = practiceLanguage;
    }
  }, [practiceOption, dropdown, practiceLanguage]);

  if (list.length > 0) {
    return (
      <div className="container col-xxl-8 col-xl-9 col-lg-10 col-md-11 col-sm-12 col-xs-12 my-5 px-5 bg-light rounded">
        {/* <div className="fw-bold fs-3 pt-5">Practice</div> */}
        <div
          className="row d-flex align-items-center justify-content-between my-4 py-3"
          style={{ minHeight: "450px", minWidth: "350px" }}
        >
          <div className="col-lg-3 mb-5 d-flex flex-column">
            <div className="fw-bold fs-3 pt-5">Practice</div>
            <PractiveSidebar />
            {dropdownShow ? (
              <div className="mt-3 d-flex flex-column">
                <label className="fs-5">Answer with:</label>
                <select
                  className="me-5 mt-2"
                  id="dropdown"
                  onChange={(event) => {
                    getPracticeLanguage(event.currentTarget.value);
                  }}
                >
                  <option value="english">English</option>
                  <option value="korean">Korean</option>
                </select>
              </div>
            ) : (
              ""
            )}
          </div>

          <div
            className="col-lg-8 col-md-12 mb-4"
            // style={{ minWidth: "350px" }}
          >
            {practiceOption}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-5">
      <p className="fs-4">
        Your list is empty, click the button below to create a new list
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
