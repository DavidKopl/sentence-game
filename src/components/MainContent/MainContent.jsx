import "./MainContent.css";
import React, { useRef, useState } from "react";

export default function Card() {
  //
  const cardRef = useRef();
  const [cardData, setCardData] = useState(1);
  const [state, setState] = useState({
    who: "",
    what: "",
    when: "",
    where: "",
  });
  //variables
  const arrOfQuestionName = ["who", "what", "when", "where"];
  const arrOfQuestion = ["Who?", "What?", "When?", "Where?"];
  //functions
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const switcher = (numberOfQuestion) => {
    switch (numberOfQuestion) {
      case 1:
        return state.who;
      case 2:
        return state.what;
      case 3:
        return state.when;
      case 4:
        return state.where;
      default:
        return state.who;
    }
  };

  const startPosition = () => {
    setCardData(1);
  };
  const endPosition = () => {
    setCardData(arrOfQuestion.length);
  };

  const previous = () => {
    cardRef.current.style.opacity = 0;
    setTimeout(() => {
      setCardData(cardData - 1);
      if (cardData <= 1) {
        endPosition();
      }
      cardRef.current.style.opacity = 1;
    }, 1000);
  };
  const next = () => {
    cardRef.current.style.opacity = 0;
    setTimeout(() => {
      setCardData(cardData + 1);
      if (cardData > arrOfQuestion.length - 1) {
        startPosition();
      }
      cardRef.current.style.opacity = 1;
    }, 1000);
  };
  //indicators
  const indicatorWho = (who) => {
    if (who === "") {
      return "Who";
    } else {
      return "";
    }
  };
  const indicatorWhat = (what) => {
    if (what === "") {
      return "What";
    } else {
      return "";
    }
  };
  const indicatorWhere = (where) => {
    if (where === "") {
      return "Where";
    } else {
      return "";
    }
  };
  const indicatorWhen = (when) => {
    if (when === "") {
      return "When";
    } else {
      return "";
    }
  };
  //validation
  const validation = (who, what, where, when) => {
    if (who && what && where && when !== "") {
      return false;
    } else {
      return true;
    }
  };
  //View
  return (
    <div className="App">
      <div ref={cardRef}>
        <p>{arrOfQuestion[cardData - 1]}</p>
        <form>
          <label>
            <input
              type="text"
              name={arrOfQuestionName[cardData - 1]}
              value={switcher(cardData)}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
      <div>
        <button className="btn-50" onClick={previous}>
          prev
        </button>
        <button className="btn-50" onClick={next}>
          next
        </button>
      </div>
      <h5>
        Result: {state.who} {state.what} {state.where} {state.when}
      </h5>
      <h5>
        {validation(state.who, state.what, state.where, state.when)
          ? "Your answeres are not complete"
          : "Answered are complete"}
      </h5>
      <h5>
        {validation(state.who, state.what, state.where, state.when)
          ? `You still miss this question: _${indicatorWho(
              state.who
            )}_${indicatorWhat(state.what)}_${indicatorWhere(
              state.where
            )}_${indicatorWhen(state.when)}_`
          : ""}
      </h5>
    </div>
  );
}
