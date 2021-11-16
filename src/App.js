import { useEffect, useState } from "react";
import "./App.css";
import setTimeFormat from "./setTimeFormat";
function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);
  return (
    <div className="timerContainer">
      <div>
        <span className="timeDigits">{setTimeFormat(time)}</span>
      </div>
      <div>
        <button onClick={() => setTimerOn(true)}>Start</button>
        <button onClick={() => setTime(0) & setTimerOn(false)}>Stop</button>
        <button onClick={() => setTimerOn(true)}>Resume</button>
        <button onClick={() => setTimerOn(false)}>Wait</button>
      </div>
    </div>
  );
}

export default App;
