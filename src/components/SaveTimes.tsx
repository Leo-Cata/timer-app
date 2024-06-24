import { ChangeEvent, useState } from "react";
import { handleFormatValidation } from "../utils/InputFormatValidation";
import { Time } from "../Types/Types";
import RetrieveTimes from "./RetrieveTimes";

const SaveTimes = () => {
  // component's time state
  const [compTime, setCompTime] = useState<Time>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

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
    <div>
      <div className="flex w-full text-lg justify-center space-x-4 py-10">
        <input
          type="text"
          name="Time Name"
          id="Time Name"
          onChange={handleSetName}
          className="mr-1 max-w-[150px]  bg-transparent text-white border-b border-[#7a5685] "
        />

        <input
          type="text"
          name="Time Value"
          id="Time Value"
          value={`${compTime?.hours}:${compTime?.minutes}:${compTime?.seconds}`}
          onChange={handleSaveTime}
          className="w-[80px] text-center bg-transparent text-white border-b border-[#7a5685] focus:text-white/60"
        />
        <button className="text-white" onClick={handleSaveLocal}>
          💾
        </button>
      </div>
      <RetrieveTimes />
    </div>
  );
};

export default SaveTimes;
