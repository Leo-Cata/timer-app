import { useState } from "react";
import SaveTimes from "../components/SaveTimes";
import Timer from "../components/Timer";

const TimerContainer = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Timer time={time} setTime={setTime} />
      <SaveTimes />
    </div>
  );
};

export default TimerContainer;
