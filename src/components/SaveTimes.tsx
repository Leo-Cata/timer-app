import { ChangeEvent, useState } from "react";
// import { TimeState } from "../Types/Types";
import { handleFormatValidation } from "../utils/InputFormatValidation";
import { Time } from "../Types/Types";

const SaveTimes = () => {
  const [compTime, setCompTime] = useState<Time>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const handleSaveTime = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormatValidation(e.target.value, setCompTime);
  };

  return (
    <div>
      <input
        type="text"
        value={`${compTime?.hours}:${compTime?.minutes}:${compTime?.seconds}`}
        onChange={handleSaveTime}
      />
      <button className="text-white">asd</button>
    </div>
  );
};

export default SaveTimes;
