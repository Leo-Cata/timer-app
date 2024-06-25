import { SavedItemProps } from "../Types/Types";

const SavedItem = ({ storedTimes, setDateNow }: SavedItemProps) => {
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
    <div className="text-white">
      {storedTimes.map((time) => (
        <div key={time.name}>
          <p>{time.name}</p>
          <button onClick={() => handleDeleteTime(time.name)}>trash</button>
        </div>
      ))}
    </div>
  );
};

export default SavedItem;
