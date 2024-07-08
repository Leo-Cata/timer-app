import React, { useState } from "react";
import { appContext } from "./AppContext";

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  const handleSetState = (value: boolean) => {
    setIsRunning(value);
  };

  const handleSetAlarm = (value: boolean) => {
    setIsAlarmActive(value);
  };

  return (
    <appContext.Provider
      value={{ isRunning, handleSetState, isAlarmActive, handleSetAlarm }}
    >
      {children}
    </appContext.Provider>
  );
};

export default StateProvider;
