export interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}
export interface SetTime {
  setTime: (value: Time) => void;
}

export interface TimeState extends SetTime {
  time: Time;
}

export interface SavedTimes extends Time {
  name: string;
}

interface SetDateNow {
  setDateNow: (value: string) => void;
}

export interface SavedItemProps extends SetDateNow {
  storedTimes: SavedTimes[];
  setTime: (value: Time) => void;
}

export interface StateSetterDateNow extends SetDateNow {
  dateNow: string;
  setTime: (value: Time) => void;
}

export interface StateContext {
  isRunning: boolean;
  isAlarmActive: boolean;
  handleSetAlarm: (value: boolean) => void;
  handleSetState: (value: boolean) => void;
}
