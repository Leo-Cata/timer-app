import { ChangeEvent, useEffect, useState } from "react";
import { timeConvert } from "./TimeFormatter";

const Timer = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  console.log(time);

  //keeps track if the time is running
  const [isRunning, setIsRunning] = useState(false);

  //handles the input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTime = e.target.value.replace(/[^0-9]/g, "");

    //pads the value with leading 0 to ensure its always 6 chars long
    const paddedInput = inputTime.padStart(6, "0");
    console.log("handleInputChange ~ paddedInput:", paddedInput);

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

  //handles countdown
  useEffect(() => {
    if (isRunning) {
      const countdown = setInterval(() => {
        let hoursInt = parseInt(time.hours);
        let minutesInt = parseInt(time.minutes);
        let secondsInt = parseInt(time.seconds);

        if (hoursInt === 0 && minutesInt === 0 && secondsInt === 0) {
          clearInterval(countdown);
          setTime({ hours: "00", minutes: "00", seconds: "00" });
          setIsRunning(false);
        } else {
          if (secondsInt > 0) {
            secondsInt -= 1;
          } else {
            secondsInt = 59;
            if (minutesInt > 0) {
              minutesInt -= 1;
            } else {
              minutesInt = 59;
              if (hoursInt > 0) {
                hoursInt -= 1;
              }
            }
          }

          setTime({
            hours: hoursInt.toString().padStart(2, "0"),
            minutes: minutesInt.toString().padStart(2, "0"),
            seconds: secondsInt.toString().padStart(2, "0"),
          });
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isRunning, time]);

  //start/stop button and converts to time format
  const handleStartStop = () => {
    timeConvert(time, setTime);

    setIsRunning((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <p className="text-5xl absolute right-[15%] pointer-events-none select-none top-[6px]">
          {time.hours}:{time.minutes}:{time.seconds}
        </p>
        <input
          type="text"
          className="text-5xl text-transparent bg-transparent w-[250px] border-red-700 border"
          onChange={handleInputChange}
          maxLength={6}
        />
      </div>
      <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Timer;
