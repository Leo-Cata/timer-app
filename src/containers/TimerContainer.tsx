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
    <div className="flex flex-col items-center lg:mt-52 space-y-10 w-full">
      <Timer time={time} setTime={setTime} />
      <SaveTimes setTime={setTime} />
    </div>
  );
};

export default TimerContainer;
