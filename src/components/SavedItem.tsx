import { useContext, useState } from "react";
import { SavedItemProps, StateContext, Time } from "../Types/Types";

import { LuTrash } from "react-icons/lu";
import { VscLoading } from "react-icons/vsc";
import { appContext } from "../context/AppContext";

const SavedItem = ({ storedTimes, setDateNow, setTime }: SavedItemProps) => {
  //gets order from lc
  const storedInfo = localStorage.getItem("order");

  // state to determine if it's waiting for the LC to update which doesn't really work as intended
  const [coolDown, setCoolDown] = useState(false);

  const { isRunning, handleSetState, isAlarmActive, handleSetAlarm } =
    useContext(appContext) as StateContext;

  const handleSetSavedTime = (time: Time) => {
    if (isRunning) {
      handleSetState(false);
    }

    if (isAlarmActive) {
      handleSetAlarm(false);
    }

    setTime({
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds,
    });
  };

  const handleDeleteTime = (keyName: string) => {
    // interval to give time for the re-render
    setCoolDown(true);

    // removes key from lc
    localStorage.removeItem(keyName);

    // if storedInfo exits
    if (storedInfo) {
      //parse it
      const parsedTime = JSON.parse(storedInfo);

      // find the index element matching keyName
      const keyIndex = parsedTime.indexOf(keyName);

      // if keyIndex is not false
      if (keyIndex != -1) {
        // remove keyIndex from element
        parsedTime.splice(keyIndex, 1);

        // sets updated element
        localStorage.setItem("order", JSON.stringify(parsedTime));

        setDateNow(new Date().toString());
      }
    }
    setInterval(() => {
      setCoolDown(false);
    }, 1250);
  };

  return (
    <div className="text-white space-y-2  lg:text-xl ">
      {storedTimes.map((time) => (
        <div
          key={time.name}
          className="flex px-2 justify-between py-2 bg-[#2C1F30] rounded-md border-b-[3px] border-[#4e3755] hover:bg-[#4e3755]"
        >
          <div
            className="hover:cursor-pointer flex w-full "
            onClick={() => handleSetSavedTime(time)}
          >
            <p className="w-full">{time.name}</p>
            <p className="mx-5 lg:mx-10">
              {time.hours}:{time.minutes}:{time.seconds}
            </p>
          </div>
          {coolDown ? (
            <VscLoading size={24} className="animate-spin text-blue-400" />
          ) : (
            <button
              disabled={coolDown}
              onClick={() => (coolDown ? null : handleDeleteTime(time.name))}
              className="text-red-800 hover:text-red-400
              "
            >
              <LuTrash size={24} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SavedItem;
