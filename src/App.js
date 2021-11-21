import { Observable, Subject } from "rxjs";
import { buffer, debounceTime, filter, takeUntil } from "rxjs/operators";
import { useEffect, useState } from "react";
import "./App.css";
import setTimeFormat from "./setTimeFormat";

function App() {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState("stop");

  const click$ = new Subject();

  const start = () => {
    setTimer("start");
  };
  const stop = () => {
    setTime(0);
    setTimer("stop");
  };
  const reset = () => {
    setTime(0);
  };

  const wait = () => {
    click$.next();
    setTimer("wait");
    click$.next();
  };

  useEffect(() => {
    const timer$ = new Observable((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next((count += 1));
      }, 1000);
      return () => clearInterval(interval);
    });
const doubleClick$ = click$.pipe(
  buffer(click$.pipe(debounceTime(300))),
  filter((arr) => arr.length >= 2)
);
    const subscription$ = timer$.pipe(takeUntil(doubleClick$)).subscribe({
      next() {
        if (timer === "start") {
          setTime((prev) => prev + 1);
        }
      },
    });
    return () => subscription$.unsubscribe();
  });

  return (
    <div className="timerContainer">
      <div>
        <span className="timeDigits">{setTimeFormat(time)}</span>
      </div>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <button onClick={wait}>Wait</button>
      </div>
    </div>
  );
}

export default App;
