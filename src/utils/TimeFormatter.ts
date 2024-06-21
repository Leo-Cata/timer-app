// receives time, set time and set is running
// handles logic to convert the time/set it and run the timer

import { TimeState } from "../Types/Types";

export const timeConvert = ({ time, setTime }: TimeState) => {
  //parses into an integer of base 10 and converts to hours/mins/seconds
  const totalSeconds =
    parseInt(time.hours, 10) * 3600 +
    parseInt(time.minutes, 10) * 60 +
    parseInt(time.seconds, 10);

  // converts to actual time format
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // adds padding and converts back to string
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  setTime({
    hours: formattedHours,
    minutes: formattedMinutes,
    seconds: formattedSeconds,
  });
};
