import { Time } from "../Types/Types";

export const handleFormatValidation = (
  e: string,
  setTime: (value: Time) => void
) => {
  //saves the input time only if its a number, when it exceeds 6 chars the first element will be deleted
  let inputTime = e.replace(/[^0-9]/g, "");

  if (inputTime.length > 6) {
    inputTime = inputTime.slice(-6);
  }

  //makes sure the final value is 6 chars long
  const paddedInput = inputTime.padStart(6, "0");

  //then separates the values into h/m/s and sets them in the state
  const newHours = paddedInput.substring(0, 2);
  const newMins = paddedInput.substring(2, 4);
  const newSecs = paddedInput.substring(4, 6);

  setTime({
    hours: newHours.toString(),
    minutes: newMins.toString(),
    seconds: newSecs.toString(),
  });
};
