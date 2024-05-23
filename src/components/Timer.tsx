import { ChangeEvent, useState } from "react";
import { convertAndStartTimer } from "./TimeFormatter";

const Timer = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  //keeps track if the time is running
  const [isRunning, setIsRunning] = useState(false);

  //handles the input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTime = e.target.value;

    //pads the value with leading 0 to ensure its always 6 chars long
    const paddedInput = inputTime.padStart(6, "0");

    // saves the seconds in a state

    const hours = paddedInput.substring(0, 2);

    const minutes = paddedInput.substring(2, 4);

    const seconds = paddedInput.substring(4, 6);

    setTime({
      hours: hours.toString(),
      minutes: minutes.toString(),
      seconds: seconds.toString(),
    });
  };

  //start/stop button and converts to time format
  const handleStartStop = () => {
    convertAndStartTimer(time, setTime, setIsRunning);
  };

  return (
    <div className="flex flex-col">
      <p className="text-center text-5xl">
        {time.hours}:{time.minutes}:{time.seconds}
      </p>
      <input
        type="text"
        className="text-5xl text-center w-fit"
        onChange={handleInputChange}
      />
      <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Timer;
