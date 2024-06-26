import { ChangeEvent, useState } from "react";
import { handleFormatValidation } from "../utils/InputFormatValidation";
import { SetTime, Time } from "../Types/Types";
import RetrieveTimes from "./RetrieveTimes";

import { LuBookmark } from "react-icons/lu";

const SaveTimes = ({ setTime }: SetTime) => {
  // component's time state
  const [compTime, setCompTime] = useState<Time>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [dateNow, setDateNow] = useState<string>("");

  //components time state name to save
  const [timeName, setTimeName] = useState("");

  // handles formatting of this input's time values
  const handleSaveTime = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormatValidation(e.target.value, setCompTime);
  };

  //saves input time
  const handleSaveLocal = () => {
    //if there is no name, throw error and exit
    if (!timeName) {
      alert("Name required");
      return;
    }

    // check if any of the values have been modified, save to LC or throw error
    if (
      compTime.hours !== "00" ||
      compTime.minutes !== "00" ||
      compTime.seconds !== "00"
    ) {
      // save item in lc
      localStorage.setItem(timeName.toString(), JSON.stringify(compTime));

      // get lc item with key order
      // if it exists, parse it from json, else create an empty array
      // convert to string and push current item
      //save item back again
      const savedOrder = localStorage.getItem("order");
      const order = savedOrder ? JSON.parse(savedOrder) : [];

      // when an update is done, set the current date to dynamically reload RetrieveTimes
      setDateNow(new Date().toString());

      // if timeName was saved in order before, don't add a duplicated
      if (!order.includes(timeName)) {
        order.push(timeName.toString());
        localStorage.setItem("order", JSON.stringify(order));
      }
    } else {
      alert("Time required");
    }
  };

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeName(e.target.value);
  };

  return (
    <div className="max-w-[590px] w-full">
      <div className="space-x-4 text-base lg:text-xl flex justify-between ">
        <input
          type="text"
          name="Time Name"
          id="Time Name"
          onChange={handleSetName}
          maxLength={20}
          className="bg-transparent text-white border-b-2 border-[#7a5685] pb-1 pl-1"
          placeholder="Name"
        />
        <div className="self-baseline flex">
          <input
            type="tel"
            name="Time Value"
            id="Time Value"
            value={`${compTime?.hours}:${compTime?.minutes}:${compTime?.seconds}`}
            onChange={handleSaveTime}
            className="text-center bg-transparent text-white border-b-2 border-[#7a5685] focus:text-white/60 max-w-[70px] lg:max-w-[100px] pb-1 mr-6"
          />
          <button
            className="text-white text-2xl mr-2"
            onClick={handleSaveLocal}
          >
            <LuBookmark />
          </button>
        </div>
      </div>
      <RetrieveTimes
        dateNow={dateNow}
        setDateNow={setDateNow}
        setTime={setTime}
      />
    </div>
  );
};

export default SaveTimes;
