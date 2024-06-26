import { SavedItemProps } from "../Types/Types";

import { LuTrash } from "react-icons/lu";

const SavedItem = ({ storedTimes, setDateNow, setTime }: SavedItemProps) => {
  //gets order from lc
  const storedInfo = localStorage.getItem("order");

  const handleDeleteTime = (keyName: string) => {
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
  };

  return (
    <div className="text-white space-y-2 pt-10 lg:text-xl">
      {storedTimes.map((time) => (
        <div
          key={time.name}
          className="flex px-2 justify-between py-2 bg-[#2C1F30] rounded-md border-b-[3px] border-[#4e3755] "
        >
          <div
            className="hover:cursor-pointer flex w-full"
            onClick={() =>
              setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds,
              })
            }
          >
            <p className="w-full">{time.name}</p>
            <p className="mx-5 lg:mx-10">
              {time.hours}:{time.minutes}:{time.seconds}
            </p>
          </div>
          <button
            onClick={() => handleDeleteTime(time.name)}
            className="text-red-800"
          >
            <LuTrash size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedItem;
