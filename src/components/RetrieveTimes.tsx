import { useEffect, useState } from "react";
import { SavedTimes } from "../Types/Types";

const RetrieveTimes = () => {
  // save the local storage keys
  const [storedTimes, setStoredTimes] = useState<SavedTimes[]>([]);

  useEffect(() => {
    //get the elements in 'order'
    const orderKeys: string | null = localStorage.getItem("order");

    //empty array initialized to later save all the times in one place
    const LCTimesToSet: SavedTimes[] = [];

    //if it has length
    if (orderKeys) {
      //parse it
      const parsedKeys: string[] = JSON.parse(orderKeys);
      //for each element in the array
      parsedKeys.forEach((key) => {
        // get item with name key
        const getItem: string | null = localStorage.getItem(key);

        // if there getItem isn't null
        if (getItem) {
          // parse the item, then add name field and assign key
          const parsedItem: SavedTimes = JSON.parse(getItem);
          parsedItem.name = key;

          //finally, push it to the array
          LCTimesToSet.push(parsedItem);
        }
      });
    }

    //and save it to the state
    setStoredTimes(LCTimesToSet);
  }, []);

  const handleDeleteTime = (timeName: string) => {
    localStorage.removeItem(timeName);

    const asd = JSON.parse(localStorage.getItem("order"));

    const index = asd?.indexOf(timeName);
    console.log(index);
    if (index != -1) {
      asd?.splice(index, 1);
      console.log(asd);
      localStorage.removeItem("order");
      localStorage.setItem("order", JSON.stringify(asd));
    }
  };

  return (
    <div>
      {storedTimes.map((time) => (
        <div key={time.name}>
          <p className="text-white">
            {time.name}/{time.hours}:{time.minutes}:{time.seconds}
          </p>
          <button onClick={() => handleDeleteTime(time.name)}>🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default RetrieveTimes;
