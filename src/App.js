import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const fetchData = () => {
    axios
      .get(`https://opentdb.com/api.php?amount=1`)
      .then((res) => setQuestions(res.data.results));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    if (!value) {
      setMessage("Enter a value");
      return;
    } else {
      const answer = questions[0].correct_answer;
      if (answer.toLowerCase().includes(value.toLowerCase())) {
        setMessage("Correct Answer");
      } else {
        setMessage("Wrong Answer ... try again");
      }
    }
    setTimeout(() => {
      fetchData();
    }, 1500);
    setValue("");
  };

  setTimeout(() => {
    setMessage("");
  }, 3000);
  return (
    <div className="App">
      <h1>Trivia game</h1>
      <div className="alert alert-primary" role="alert">
        <h3>{message}</h3>
      </div>

      {questions.map((questions) => (
        <div key={questions.question[0]}>
          <h4>{questions.question}</h4>
        </div>
      ))}
      <div className="input-group ">
        <input
          type="text"
          className="form-control ms-5"
          placeholder="Answer"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-primary me-5"
          type="submit button"
          id="button-addon2"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>

      {questions.map((questions) => (
        <div key={questions}>
          <ul className="list-group">
            <li className="list-group-item list-group-item-primary">
              {" "}
              {questions.correct_answer}
            </li>
            <li className="list-group-item list-group-item-primary">
              {" "}
              {questions.incorrect_answers[0]}
            </li>
            <li className="list-group-item list-group-item-primary">
              {" "}
              {questions.incorrect_answers[1]}
            </li>
            <li className="list-group-item list-group-item-primary">
              {" "}
              {questions.incorrect_answers[2]}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
