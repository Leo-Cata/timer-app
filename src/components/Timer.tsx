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

  //alarm sound in a state so it stays during rerenders
  const [alarmAudio] = useState(new Audio("bedside-clock-alarm-95792.mp3"));

  //keeps track if the sound is playing

  //handles the input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // saves input time only if its a number, if it exceeds 6 characters the first element will be deleted
    let inputTime = e.target.value.replace(/[^0-9]/g, "");
    if (inputTime.length > 6) {
      inputTime = e.target.value.slice(-6);
    }
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
  }, [isRunning, time, alarmAudio]);

  //start/stop button and converts to time format
  const handleStartStop = () => {
    //pauses sound and resets it
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    timeConvert(time, setTime);

    setIsRunning((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#2C1F30] text-white w-[90%] h-[300px] rounded-lg border-[#4e3755] border max-w-[700px]">
      <div className="relative my-10">
        <p className="text-5xl absolute right-[5%] pointer-events-none select-none font-semibold">
          {time.hours}:{time.minutes}:{time.seconds}
        </p>
        <input
          type="text"
          className="text-transparent bg-transparent w-[200px] h-14 text-[1px] outline-none border-b border-[#7a5685]"
          onChange={handleInputChange}
          value={`${time.hours}${time.minutes}${time.seconds}`}
        />
      </div>
      <button
        onClick={handleStartStop}
        className=" bg-[#4e3755] text-xl px-4 rounded-full pb-[5px] hover:bg-[#7a5685] font-semibold"
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Timer;
