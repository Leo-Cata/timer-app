import { useEffect, useState } from "react";
import { SavedTimes, StateSetterDateNow } from "../Types/Types";
import SavedItem from "./SavedItem";

const RetrieveTimes = ({
  dateNow,
  setDateNow,
  setTime,
}: StateSetterDateNow) => {
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
  }, [dateNow, setDateNow]);

  return (
    <div>
      <SavedItem
        storedTimes={storedTimes}
        setDateNow={setDateNow}
        setTime={setTime}
      />
    </div>
  );
};

export default RetrieveTimes;
