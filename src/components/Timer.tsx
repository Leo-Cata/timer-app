import { ChangeEvent, useEffect, useState } from "react";
import { timeConvert } from "../utils/TimeFormatter";
import { TimeState } from "../Types/Types";
import { handleFormatValidation } from "../utils/InputFormatValidation";

const Timer = ({ time, setTime }: TimeState) => {
  //keeps track if the time is running
  const [isRunning, setIsRunning] = useState(false);

  //alarm sound in a state so it stays during rerenders
  const [alarmAudio] = useState(new Audio("bedside-clock-alarm-95792.mp3"));

  //keeps track if the alarm is active
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  //handles the input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormatValidation(e.target.value, setTime);
  };

  //handles countdown
  useEffect(() => {
    // sound variable

    if (isRunning) {
      const countdown = setInterval(() => {
        // parse to int
        let hoursInt = parseInt(time.hours);
        let minutesInt = parseInt(time.minutes);
        let secondsInt = parseInt(time.seconds);

        // if it reaches 0, it should clear the state
        if (hoursInt === 0 && minutesInt === 0 && secondsInt === 0) {
          setTime({ hours: "00", minutes: "00", seconds: "00" });

          //plays audio
          alarmAudio.play();
          setIsAlarmActive(true);
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
  }, [isRunning, time, alarmAudio, setTime]);

  //start/stop button and converts to time format
  const handleStartStop = () => {
    //pauses sound and resets it
    alarmAudio.pause();
    alarmAudio.currentTime = 0;

    timeConvert({ time, setTime });

    setIsRunning((prev) => !prev);

    setIsAlarmActive(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center  text-white w-[90%] h-[300px] rounded-lg  border max-w-[700px]
    ${
      isAlarmActive
        ? "border-red-400 bg-red-500/60"
        : " border-[#4e3755] bg-[#2C1F30]"
    }
    `}
    >
      <div className="relative my-10 group">
        <p
          className={`text-5xl absolute right-[5%] pointer-events-none select-none font-semibold  ${
            !isRunning && "group-focus-within:text-white/60"
          }`}
        >
          {time.hours}:{time.minutes}:{time.seconds}
        </p>
        <div className="flex">
          <input
            type="text"
            className={`text-transparent bg-transparent w-[200px] h-14 text-[0px] outline-none border-b  ${
              isAlarmActive ? "border-red-300" : "border-[#7a5685]"
            }`}
            onChange={isRunning ? undefined : handleInputChange}
            value={`${time.hours}${time.minutes}${time.seconds}`}
          />
          {!isRunning && (
            <div
              className={`bg-white w-[1.5px] my-1 animate-expandAnimation origin-center h-[80%] absolute right-0 hidden ${
                !isRunning && "group-focus-within:block"
              }`}
            />
          )}
        </div>
      </div>
      <button
        onClick={handleStartStop}
        className={`  text-xl px-4 rounded-full pb-[5px]  font-semibold ${
          isAlarmActive
            ? "bg-red-700 hover:bg-red-600"
            : " bg-[#4e3755] hover:bg-[#7a5685]"
        }`}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Timer;
