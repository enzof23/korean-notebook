import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Navbar() {
  const { displayAlert } = useGlobalContext();
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid fs-5 fw-bold">
        <Link to="/" className="nav-link">
          My Korean Notebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDropdown"
          aria-controls="navbarDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => {
                  displayAlert("no-alert");
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/list"
                className="nav-link"
                onClick={() => {
                  displayAlert("no-alert");
                }}
              >
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/practice"
                className="nav-link"
                onClick={() => {
                  displayAlert("no-alert");
                }}
              >
                Practice
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
