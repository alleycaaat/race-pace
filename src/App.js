import { useState } from "react";
import "./style.css";

function App() {
  const [inputs, setInputs] = useState({
    distance: "",
    raceDistane: "",
    hour: "",
    minute: "",
    second: "",
  });
  const [validations, setValidations] = useState({
    distance: "",
    raceDistane: "",
    hour: "",
    minute: "",
    second: "",
  });
  const {
    distance: distanceMsg,
    raceDistance: raceDistanceMsg,
    hour: goalHourMsg,
    minute: goalMinuteMsg,
    second: goalSecondMsg,
  } = validations;
  const [resultsMsg, setResultsMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    let h = hour * 3600,
      m = minute * 60,
      s = second * 1,
      total = h + m + s,
      minutes = eval(total / 60);
    /*calculates pace for miles*/
    if (raceDistance === "miles") {
      let pace = minutes / distance,
        paceMin = Math.floor(pace),
        paceSec = Math.round((pace - paceMin) * 60);

      if (paceSec < 10) {
        paceSec = "0" + paceSec;
      }
      /*displays results*/
      setResultsMsg(
        "To achieve your goal, you will need to average a " +
          paceMin +
          ":" +
          paceSec +
          " per mile pace."
      );
    }
    /*calculates pace for kilometers*/
    if (raceDistance === "kilometers") {
      let pace = minutes / (distance / 1.609),
        paceMin = Math.floor(pace),
        paceSec = Math.round((pace - paceMin) * 60);

      if (paceSec < 10) {
        paceSec = "0" + paceSec;
      }
      /*displays results*/
      setResultsMsg(
        "To achieve your goal, you will need to average a " +
          paceMin +
          ":" +
          paceSec +
          " per kilometer pace."
      );
    }
  };
  const reset = (e) => {
    e.preventDefault();
    setInputs({
      distance: "",
      raceDistance: "",
      hour: "",
      minute: "",
      second: "",
    });
    setValidations({
      raceDistanceMsg: "",
      goalHourMsg: "",
      goalMinuteMsg: "",
      goalSecondMsg: "",
    });
    setResultsMsg();
  };
  const validate = (e) => {
    const { name } = e.target;
    const value = inputs[name];
    const isNum = /^\d*\.?\d+$/;
    let message = "";
    /*if value left empty, alert*/
    if (!value) {
      message = `Required field`;
    }
    if (value && name === "distance" && !isNum.test(value)) {
      message = `Only numbers and decimals allowed`;
    }
    if (value && name === "hour" && !isNum.test(value)) {
      message = `Only numbers allowed for hours`;
    }
    if (value && name === "minute" && !isNum.test(value)) {
      message = `Only numbers allowed for minutes`;
    }
    if (value && name === "second" && !isNum.test(value)) {
      message = `Only numbers allowed for seconds`;
    }
    setValidations({ ...validations, [name]: message });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const { distance, raceDistance, hour, minute, second } = inputs;

  return (
    <div class='wrapper'>
      <form onSubmit={handleSubmit}>
        <div class='calculator'>
          <h1>Race Pace Calculator</h1>
          <h2>Find out the pace needed to achieve your goal finishing time!</h2>
          <div class='distance'>
            <p>How long is the race?</p>
            <div className='item'>
              <label hidden for='distance'>
                Race length
              </label>
              <input
                type='text'
                name='distance'
                id='distance'
                value={distance}
                onChange={handleChange}
                onBlur={validate}
                placeholder='distance'
                maxLength='6'
                required
              />
            </div>
            <div className='message' role='alert' aria-live='assertive'>
              {distanceMsg}
            </div>
          </div>
          <div class='measure'>
            <p>Is the race measured in miles or kilometers?</p>
            <div class='field'>
              <label for='miles'>mi</label>
              <input
                type='radio'
                id='miles'
                name='raceDistance'
                value='miles'
                onChange={handleChange}
                required
              />
              <label for='kilometers'>km</label>
              <input
                type='radio'
                id='kilometers'
                name='raceDistance'
                value='kilometers'
                onChange={handleChange}
              />
            </div>
            <div className='message' role='alert' aria-live='assertive'>
              {raceDistanceMsg}
            </div>
          </div>
          <div class='goal'>
            <p>What is your goal finishing time?</p>
            <div class='field'>
              <label hidden for='goalHour'>
                Goal hour amount
              </label>
              <input
                type='text'
                id='goalHour'
                name='hour'
                value={hour}
                onChange={handleChange}
                onBlur={validate}
                placeholder='hh'
                maxlength='2'
                required
              />
              <p className='colon'>:</p>
              <label hidden for='goalMinute'>
                Goal minute amount
              </label>
              <input
                type='text'
                id='goalMinute'
                name='minute'
                value={minute}
                onChange={handleChange}
                onBlur={validate}
                placeholder='mm'
                maxlength='2'
                required
              />
              <p className='colon'>:</p>
              <label hidden for='goalSecond'>
                Goal second amount
              </label>
              <input
                type='text'
                id='goalSecond'
                name='second'
                value={second}
                onChange={handleChange}
                onBlur={validate}
                placeholder='ss'
                maxlength='2'
                required
              />
            </div>
            <span className='message' role='alert' aria-live='assertive'>
              {goalHourMsg}
            </span>
            <span className='message' role='alert' aria-live='assertive'>
              {goalMinuteMsg}
            </span>
            <span className='message' role='alert' aria-live='assertive'>
              {goalSecondMsg}
            </span>
          </div>
          <div class='button'>
            <button id='submit' class='submit'>
              Submit
            </button>
            <button id='reset' className='reset' onClick={reset}>
              Reset
            </button>
          </div>
          {resultsMsg}
        </div>
      </form>
    </div>
  );
}

export default App;
