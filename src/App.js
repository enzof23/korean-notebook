import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import List from "./components/List";
import Practice from "./components/Practice";
import { useGlobalContext } from "./context";

function App() {
  const { loading } = useGlobalContext();

  // loading is true while list is being fetch from firebase
  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center my-auto"
        style={{ height: "100%" }}
      >
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // once list is fetched, display content
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </Router>
  );
}

export default App;
