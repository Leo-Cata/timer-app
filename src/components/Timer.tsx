import { ChangeEvent, useContext, useEffect, useState } from "react";
import { timeConvert } from "../utils/TimeFormatter";
import { handleFormatValidation } from "../utils/InputFormatValidation";
import { StateContext, TimeState } from "../Types/Types";
// import StateProvider from "../context/StateProvider";
import { appContext } from "../context/AppContext";

const Timer = ({ time, setTime }: TimeState) => {
  const { isRunning, handleSetState } = useContext(appContext) as StateContext;

  //alarm sound in a state so it stays during rerenders
  const [alarmAudio] = useState(new Audio("bedside-clock-alarm-95792.mp3"));

  //keeps track if the alarm is active
  const { isAlarmActive, handleSetAlarm } = useContext(
    appContext
  ) as StateContext;

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
          handleSetAlarm(true);
          document.title = "Timer";

          //after x seconds, pause the alarm
          setTimeout(() => {
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
            handleSetState(false);
            handleSetAlarm(false);
          }, 15000);
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

          // dynamically changes the title
          document.title = `${time.hours}:${time.minutes}:${time.seconds}`;
        }
      }, 1000);

      return () => clearInterval(countdown);
    }

    // when clicking on a saved time, if the alarm is playing this will stop it from keep playing
    if (!isAlarmActive) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
  }, [
    isRunning,
    time,
    alarmAudio,
    setTime,
    handleSetState,
    handleSetAlarm,
    isAlarmActive,
  ]);

  //start/stop button and converts to time format
  const handleStartStop = () => {
    //pauses sound and resets it
    alarmAudio.pause();
    alarmAudio.currentTime = 0;

    timeConvert({ time, setTime });

    handleSetState(!isRunning);

    handleSetAlarm(false);

    document.title = "Timer";
  };

  const handleClickRunning = () => {
    handleSetState(false);
  };

  return (
    <div
      className={` text-white rounded-lg  border max-w-[600px] w-full h-[300px] flex justify-center items-center
    ${
      isAlarmActive
        ? "border-red-400 bg-red-500/60"
        : " border-[#4e3755] bg-[#2C1F30]"
    }
    `}
    >
      <div className="flex flex-col items-center space-y-5 py-10">
        <input
          type="tel"
          // when is running, show pointer to show that is clickable, else show grayed out text
          // when alarm is playing change to red, else normal
          className={`bg-transparent w-[200px]  text-5xl outline-none border-b-2 text-center 
            ${isRunning ? "cursor-pointer" : "focus-within:text-white/60"}
            ${isAlarmActive ? "border-red-300" : "border-[#7a5685]"}`}
          // changes the value when the clock is not running
          onChange={isRunning ? undefined : handleInputChange}
          // when is running, allows to stop the timer by clicking on the input
          onClick={isRunning ? handleClickRunning : undefined}
          value={`${time.hours}:${time.minutes}:${time.seconds}`}
        />
        <button
          onClick={handleStartStop}
          className={`px-4 pb-1.5 align-text-top  text-xl rounded-full  font-semibold ${
            isAlarmActive
              ? "bg-red-700 hover:bg-red-600"
              : " bg-[#4e3755] hover:bg-[#7a5685]"
          }`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
